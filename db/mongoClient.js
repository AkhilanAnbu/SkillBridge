import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let client;
let database;

export async function getDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in .env");
  }

  if (database) {
    return database;
  }

  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const databaseName = process.env.DB_NAME || "skillbridge";
  database = client.db(databaseName);

  return database;
}

export async function getSkillProfilesCollection() {
  const db = await getDatabase();
  return db.collection("skillProfiles");
}

export async function getProjectCollaborationsCollection() {
  const db = await getDatabase();
  return db.collection("projectCollaborations");
}

export async function closeMongoConnection() {
  if (client) {
    await client.close();
  }
}
