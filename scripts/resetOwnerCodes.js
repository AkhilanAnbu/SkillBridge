import { getSkillProfilesCollection } from "../db/mongoClient.js";

async function resetOwnerCodes() {
  const collection = await getSkillProfilesCollection();

  const totalProfiles = await collection.countDocuments();
  console.log(`Total profiles found: ${totalProfiles}`);

  const beforeDemoCount = await collection.countDocuments({
    ownerCode: "demo1234",
  });
  console.log(`Profiles already using demo1234 before reset: ${beforeDemoCount}`);

  const result = await collection.updateMany(
    {},
    {
      $set: {
        ownerCode: "demo1234",
        updatedAt: new Date(),
      },
    },
  );

  const afterDemoCount = await collection.countDocuments({
    ownerCode: "demo1234",
  });

  console.log(`Matched profiles: ${result.matchedCount}`);
  console.log(`Modified profiles: ${result.modifiedCount}`);
  console.log(`Profiles using demo1234 after reset: ${afterDemoCount}`);
  console.log("Done. All profiles should now use owner code: demo1234");

  process.exit(0);
}

resetOwnerCodes().catch((error) => {
  console.error("Reset failed:", error);
  process.exit(1);
});
