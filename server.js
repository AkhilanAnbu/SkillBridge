import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { closeMongoConnection } from "./db/mongoClient.js";
import skillProfilesRouter from "./routes/skillProfiles.routes.js";
import projectCollaborationsRouter from "./routes/projectCollaborations.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const fileName = fileURLToPath(import.meta.url);
const folderName = path.dirname(fileName);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(folderName, "public")));

app.get("/api/health", (request, response) => {
  response.json({ ok: true, message: "SkillBridge server is running" });
});

// Akhilan's full-stack part: Skill Profiles and Teammate Search.
app.use("/api/skill-profiles", skillProfilesRouter);
app.use("/api/project-collaborations", projectCollaborationsRouter);

app.use((request, response) => {
  response.status(404).json({ error: "This route does not exist." });
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({ error: error.message || "Server error" });
});

const server = app.listen(port, () => {
  console.log(`SkillBridge running on http://localhost:${port}`);
});

async function stopServer() {
  await closeMongoConnection();
  server.close(() => process.exit(0));
}

process.on("SIGINT", stopServer);
process.on("SIGTERM", stopServer);
