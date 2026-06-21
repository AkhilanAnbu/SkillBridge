import express from "express";
import { ObjectId } from "mongodb";
import { getProjectCollaborationsCollection } from "../db/mongoClient.js";

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

function makeProject(body) {
  const project = {
    title: text(body.title),
    creatorName: text(body.creatorName),
    creatorEmail: text(body.creatorEmail).toLowerCase(),
    category: text(body.category),
    description: text(body.description),
    requiredSkills: Array.isArray(body.requiredSkills)
      ? body.requiredSkills.map(text).filter(Boolean)
      : commaList(body.requiredSkills),
    learningOpportunities: Array.isArray(body.learningOpportunities)
      ? body.learningOpportunities.map(text).filter(Boolean)
      : commaList(body.learningOpportunities),
    availableRoles: Array.isArray(body.availableRoles)
      ? body.availableRoles.map(text).filter(Boolean)
      : commaList(body.availableRoles),
    currentMembers: Array.isArray(body.currentMembers)
      ? body.currentMembers.map(text).filter(Boolean)
      : commaList(body.currentMembers),
    schedule: text(body.schedule),
    openPositions: text(body.openPositions),
    status: text(body.status) || "Looking for members",
  };

  if (!project.title || !project.creatorName || !project.creatorEmail) {
    const error = new Error("Please add a title, your name, and your email.");
    error.status = 400;
    throw error;
  }

  if (!project.category || !project.description) {
    const error = new Error("Please add a category and a description.");
    error.status = 400;
    throw error;
  }

  return project;
}

function getMongoId(id) {
  if (!ObjectId.isValid(id)) {
    const error = new Error("Invalid project id.");
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
      { title: regex },
      { description: regex },
      { category: regex },
      { requiredSkills: regex },
      { availableRoles: regex },
    );
  }

  if (query.skill) {
    search.push({ requiredSkills: safeRegex(query.skill) });
  }

  if (query.role) {
    search.push({ availableRoles: safeRegex(query.role) });
  }

  if (search.length > 0) {
    filter.$or = search;
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.schedule) {
    filter.schedule = query.schedule;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return filter;
}

router.get("/", async (request, response, next) => {
  try {
    const collection = await getProjectCollaborationsCollection();
    const projects = await collection
      .find(getFilters(request.query))
      .sort({ updatedAt: -1 })
      .toArray();
    response.json(projects);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const collection = await getProjectCollaborationsCollection();
    const now = new Date();
    const project = {
      ...makeProject(request.body),
      createdAt: now,
      updatedAt: now,
    };

    const result = await collection.insertOne(project);
    response.status(201).json({ ...project, _id: result.insertedId });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const collection = await getProjectCollaborationsCollection();
    const result = await collection.findOneAndUpdate(
      { _id: getMongoId(request.params.id) },
      { $set: { ...makeProject(request.body), updatedAt: new Date() } },
      { returnDocument: "after" },
    );

    if (!result) {
      return response.status(404).json({ error: "Project not found." });
    }

    return response.json(result);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const collection = await getProjectCollaborationsCollection();
    const result = await collection.deleteOne({ _id: getMongoId(request.params.id) });

    if (result.deletedCount === 0) {
      return response.status(404).json({ error: "Project not found." });
    }

    return response.status(204).send();
  } catch (error) {
    return next(error);
  }
});

export default router;
