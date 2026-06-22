import { getSkillProfilesCollection } from "../db/mongoClient.js";

async function clearSkillProfiles() {
  const collection = await getSkillProfilesCollection();

  const beforeCount = await collection.countDocuments();
  console.log(`Before delete: ${beforeCount} skill profiles`);

  const result = await collection.deleteMany({});
  console.log(`Deleted: ${result.deletedCount} skill profiles`);

  const afterCount = await collection.countDocuments();
  console.log(`After delete: ${afterCount} skill profiles`);

  process.exit(0);
}

clearSkillProfiles().catch((error) => {
  console.error("Clear failed:", error);
  process.exit(1);
});
