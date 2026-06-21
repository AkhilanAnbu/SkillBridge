import dotenv from "dotenv";
import { getProjectCollaborationsCollection, closeMongoConnection } from "../db/mongoClient.js";

dotenv.config();

const categories = ["Course project", "Startup", "Research", "Creative"];
const statuses = ["Looking for members", "In progress", "Full", "Completed"];
const schedules = ["Weekdays", "Weeknights", "Weekends", "Flexible"];
const skills = ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Python", "Figma", "React"];
const learning = ["Deployment", "Accessibility", "APIs", "Databases", "Testing", "Git"];
const roles = ["Frontend", "Backend", "Full-stack", "Design/PM"];
const titles = [
  "AI Flashcard Study App",
  "Campus Carpool Finder",
  "Recipe Sharing Platform",
  "Fitness Habit Tracker",
  "Local Events Map",
  "Budget Planner Dashboard",
  "Peer Tutoring Marketplace",
  "Volunteer Hours Tracker",
];

function pick(list, index) {
  return list[index % list.length];
}

function makeSeedProject(index) {
  const now = new Date();
  return {
    title: `${pick(titles, index)} ${index}`,
    creatorName: `Student ${index}`,
    creatorEmail: `student${index}@example.com`,
    category: pick(categories, index),
    description:
      "Looking for collaborators to design, build, and ship this project. Beginners welcome.",
    requiredSkills: [pick(skills, index), pick(skills, index + 3)],
    learningOpportunities: [pick(learning, index), pick(learning, index + 2)],
    availableRoles: [pick(roles, index), pick(roles, index + 1)],
    currentMembers: [`Student ${index}`],
    schedule: pick(schedules, index),
    openPositions: String((index % 4) + 1),
    status: pick(statuses, index),
    createdAt: now,
    updatedAt: now,
  };
}

async function seed() {
  const collection = await getProjectCollaborationsCollection();
  const projects = [];

  for (let i = 1; i <= 150; i += 1) {
    projects.push(makeSeedProject(i));
  }

  await collection.insertMany(projects);
  console.log(`Inserted ${projects.length} project collaborations.`);
  await closeMongoConnection();
}

seed().catch(async (error) => {
  console.error(error);
  await closeMongoConnection();
  process.exit(1);
});
