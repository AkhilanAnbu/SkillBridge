import dotenv from "dotenv";
import { getSkillProfilesCollection, closeMongoConnection } from "../db/mongoClient.js";

dotenv.config();

const teachSkills = ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Python", "Figma"];
const learnSkills = [
  "Deployment",
  "Accessibility",
  "APIs",
  "Databases",
  "Testing",
  "Git",
  "UI Design",
];
const roles = ["Frontend", "Backend", "Full-stack", "Design/PM"];
const availability = ["Weekdays", "Weeknights", "Weekends", "Flexible"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const statuses = ["Looking for a teammate", "Open to help", "Already in a team"];

function pick(list, index) {
  return list[index % list.length];
}

function makeSeedProfile(index) {
  return {
    name: `Student ${index}`,
    email: `student${index}@example.com`,
    major: index % 2 === 0 ? "Computer Science" : "Data Science",
    skillsToTeach: [pick(teachSkills, index), pick(teachSkills, index + 2)],
    skillsToLearn: [pick(learnSkills, index), pick(learnSkills, index + 3)],
    experienceLevel: pick(levels, index),
    availability: pick(availability, index),
    preferredRole: pick(roles, index),
    meetingPreference: index % 3 === 0 ? "In person" : "Online",
    teammateStatus: pick(statuses, index),
    notes: "Seed profile for testing search and filters.",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function seed() {
  const collection = await getSkillProfilesCollection();
  const profiles = [];

  for (let i = 1; i <= 1005; i += 1) {
    profiles.push(makeSeedProfile(i));
  }

  await collection.insertMany(profiles);
  console.log(`Inserted ${profiles.length} skill profiles.`);
  await closeMongoConnection();
}

seed().catch(async (error) => {
  console.error(error);
  await closeMongoConnection();
  process.exit(1);
});
