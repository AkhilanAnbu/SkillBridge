import express from "express";
import { ObjectId } from "mongodb";
import { getSkillProfilesCollection } from "../db/mongoClient.js";

const router = express.Router();

function text(value) {
  return String(value || "").trim();
}

function commaList(value) {
  return text(value)
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function numberOrDefault(value, defaultValue) {
  const number = Number.parseInt(value, 10);

  if (Number.isNaN(number)) {
    return defaultValue;
  }

  return Math.max(0, number);
}

function makeProfile(body, options = { requireOwnerCode: true }) {
  const ownerCode = text(body.ownerCode);

  const profile = {
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    major: text(body.major),
    city: text(body.city),
    country: text(body.country),
    teammatesNeeded: numberOrDefault(body.teammatesNeeded, 1),
    skillsToTeach: Array.isArray(body.skillsToTeach)
      ? body.skillsToTeach.map(text).filter(Boolean)
      : commaList(body.skillsToTeach),
    skillsToLearn: Array.isArray(body.skillsToLearn)
      ? body.skillsToLearn.map(text).filter(Boolean)
      : commaList(body.skillsToLearn),
    experienceLevel: text(body.experienceLevel),
    availability: text(body.availability),
    preferredRole: text(body.preferredRole),
    meetingPreference: text(body.meetingPreference),
    teammateStatus: text(body.teammateStatus),
    notes: text(body.notes),
  };

  if (!profile.name || !profile.email || !profile.major) {
    const error = new Error("Please add name, email, and major.");
    error.status = 400;
    throw error;
  }

  if (options.requireOwnerCode && ownerCode.length < 4) {
    const error = new Error("Please add a profile owner code with at least 4 characters.");
    error.status = 400;
    throw error;
  }

  if (profile.skillsToTeach.length === 0 || profile.skillsToLearn.length === 0) {
    const error = new Error("Please add at least one teaching skill and one learning skill.");
    error.status = 400;
    throw error;
  }

  if (ownerCode) {
    profile.ownerCode = ownerCode;
  }

  return profile;
}

function getMongoId(id) {
  if (!ObjectId.isValid(id)) {
    const error = new Error("Invalid profile id.");
    error.status = 400;
    throw error;
  }

  return new ObjectId(id);
}

function safeRegex(value) {
  return new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

function redactProfile(profile) {
  if (!profile) {
    return profile;
  }

  const { ownerCode: _ownerCode, ...safeProfile } = profile;
  return safeProfile;
}

function assertOwnerCode(inputCode, profile) {
  const enteredCode = text(inputCode);
  const savedCode = text(profile.ownerCode);
  const isSeededDemoProfile = text(profile.email).endsWith("@skillbridge.edu");

  if (savedCode && enteredCode === savedCode) {
    return;
  }

  if (!savedCode && isSeededDemoProfile && enteredCode === "demo1234") {
    return;
  }

  const error = new Error("Incorrect profile owner code.");
  error.status = 403;
  throw error;
}

function getFilters(query) {
  const filter = {};
  const andFilters = [];

  if (query.search) {
    const regex = safeRegex(query.search);

    andFilters.push({
      $or: [
        { name: regex },
        { email: regex },
        { major: regex },
        { city: regex },
        { country: regex },
        { skillsToTeach: regex },
        { skillsToLearn: regex },
      ],
    });
  }

  if (query.skill) {
    const regex = safeRegex(query.skill);
    andFilters.push({
      $or: [{ skillsToTeach: regex }, { skillsToLearn: regex }],
    });
  }

  if (query.city) {
    filter.city = safeRegex(query.city);
  }

  if (query.country) {
    filter.country = safeRegex(query.country);
  }

  if (query.teamAvailability === "open") {
    andFilters.push({
      $or: [{ teammatesNeeded: { $gt: 0 } }, { teammatesNeeded: { $exists: false } }],
    });
  }

  if (query.teamAvailability === "filled") {
    filter.teammatesNeeded = 0;
  }

  if (query.availability) {
    filter.availability = query.availability;
  }

  if (query.experienceLevel) {
    filter.experienceLevel = query.experienceLevel;
  }

  if (query.preferredRole) {
    filter.preferredRole = query.preferredRole;
  }

  if (query.teammateStatus) {
    filter.teammateStatus = query.teammateStatus;
  }

  if (andFilters.length > 0) {
    filter.$and = andFilters;
  }

  return filter;
}

router.get("/", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const profiles = await collection
      .find(getFilters(request.query))
      .sort({ updatedAt: -1 })
      .toArray();

    response.json(profiles.map(redactProfile));
  } catch (error) {
    next(error);
  }
});

router.post("/:id/verify-owner", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const _id = getMongoId(request.params.id);
    const existingProfile = await collection.findOne({ _id });

    if (!existingProfile) {
      return response.status(404).json({ error: "Profile not found." });
    }

    assertOwnerCode(request.body.ownerCode, existingProfile);

    return response.json(redactProfile(existingProfile));
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const now = new Date();
    const profile = {
      ...makeProfile(request.body, { requireOwnerCode: true }),
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(profile);
    response.status(201).json(redactProfile({ ...profile, _id: result.insertedId }));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const _id = getMongoId(request.params.id);
    const existingProfile = await collection.findOne({ _id });

    if (!existingProfile) {
      return response.status(404).json({ error: "Profile not found." });
    }

    const authorizationCode = request.body.currentOwnerCode || request.body.ownerCode;
    assertOwnerCode(authorizationCode, existingProfile);

    const newOwnerCode = text(request.body.ownerCode);

    if (newOwnerCode.length < 4) {
      return response.status(400).json({
        error: "Owner code must be at least 4 characters.",
      });
    }

    const updatedProfile = {
      ...makeProfile(request.body, { requireOwnerCode: false }),
      ownerCode: newOwnerCode,
      updatedAt: new Date(),
    };

    const result = await collection.findOneAndUpdate(
      { _id },
      { $set: updatedProfile },
      { returnDocument: "after" },
    );

    return response.json(redactProfile(result));
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const _id = getMongoId(request.params.id);
    const existingProfile = await collection.findOne({ _id });

    if (!existingProfile) {
      return response.status(404).json({ error: "Profile not found." });
    }

    assertOwnerCode(request.get("x-owner-code"), existingProfile);

    await collection.deleteOne({ _id });
    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
