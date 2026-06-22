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

function makeProfile(body) {
  const profile = {
    name: text(body.name),
    email: text(body.email).toLowerCase(),
    major: text(body.major),
    city: text(body.city),
    country: text(body.country),
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

  if (profile.skillsToTeach.length === 0 || profile.skillsToLearn.length === 0) {
    const error = new Error("Please add at least one teaching skill and one learning skill.");
    error.status = 400;
    throw error;
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

function getFilters(query) {
  const filter = {};
  const search = [];

  if (query.search) {
    const regex = safeRegex(query.search);
    search.push(
      { name: regex },
      { email: regex },
      { major: regex },
      { city: regex },
      { country: regex },
      { skillsToTeach: regex },
      { skillsToLearn: regex },
    );
  }

  if (query.skill) {
    const regex = safeRegex(query.skill);
    search.push({ skillsToTeach: regex }, { skillsToLearn: regex });
  }

  if (search.length > 0) {
    filter.$or = search;
  }

  if (query.city) {
    filter.city = safeRegex(query.city);
  }

  if (query.country) {
    filter.country = safeRegex(query.country);
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

  return filter;
}

router.get("/", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const profiles = await collection
      .find(getFilters(request.query))
      .sort({ updatedAt: -1 })
      .toArray();

    response.json(profiles);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const now = new Date();
    const profile = {
      ...makeProfile(request.body),
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(profile);
    response.status(201).json({ ...profile, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const result = await collection.findOneAndUpdate(
      { _id: getMongoId(request.params.id) },
      { $set: { ...makeProfile(request.body), updatedAt: new Date() } },
      { returnDocument: "after" },
    );

    if (!result) {
      return response.status(404).json({ error: "Profile not found." });
    }

    return response.json(result);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const collection = await getSkillProfilesCollection();
    const result = await collection.deleteOne({ _id: getMongoId(request.params.id) });

    if (result.deletedCount === 0) {
      return response.status(404).json({ error: "Profile not found." });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
