import { getSkillProfilesCollection } from "../db/mongoClient.js";

const firstNames = [
  "Aarav",
  "Maya",
  "Ethan",
  "Sophia",
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Alan",
  "Sam",
  "Riya",
  "Arjun",
  "Nisha",
  "Daniel",
  "Meera",
  "Lucas",
  "Aisha",
  "Kabir",
  "Ananya",
  "Ishan",
  "Priya",
  "Rahul",
  "Neha",
  "Vikram",
  "Sara",
  "David",
  "Emily",
  "Aditya",
  "Kavya",
  "Nolan",
];

const lastNames = [
  "Patel",
  "Sharma",
  "Kumar",
  "Anu",
  "Malar",
  "Chen",
  "Lee",
  "Garcia",
  "Smith",
  "Brown",
  "Wilson",
  "Thomas",
  "Nair",
  "Rao",
  "Menon",
  "Kapoor",
  "Das",
  "Ahmed",
  "Johnson",
  "Davis",
  "Iyer",
  "Mehta",
  "Roy",
  "Bose",
  "Williams",
  "Anderson",
];

const majors = [
  "Computer Science",
  "Data Science",
  "Information Systems",
  "Software Engineering",
  "Artificial Intelligence",
  "Cybersecurity",
  "Business Analytics",
  "Human Computer Interaction",
  "Computer Engineering",
];

const locations = [
  { city: "Boston", country: "USA" },
  { city: "Cambridge", country: "USA" },
  { city: "Brookline", country: "USA" },
  { city: "Somerville", country: "USA" },
  { city: "Malden", country: "USA" },
  { city: "Quincy", country: "USA" },
  { city: "New York", country: "USA" },
  { city: "Seattle", country: "USA" },
  { city: "San Francisco", country: "USA" },
  { city: "Austin", country: "USA" },
  { city: "Chennai", country: "India" },
  { city: "Bangalore", country: "India" },
  { city: "Hyderabad", country: "India" },
  { city: "Mumbai", country: "India" },
  { city: "Delhi", country: "India" },
  { city: "Toronto", country: "Canada" },
  { city: "Vancouver", country: "Canada" },
  { city: "London", country: "United Kingdom" },
  { city: "Manchester", country: "United Kingdom" },
  { city: "Berlin", country: "Germany" },
  { city: "Munich", country: "Germany" },
  { city: "Singapore", country: "Singapore" },
  { city: "Sydney", country: "Australia" },
  { city: "Melbourne", country: "Australia" },
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "React",
  "SQL",
  "Data Visualization",
  "Machine Learning",
  "UI Design",
  "Figma",
  "Git",
  "REST APIs",
  "Cloud Deployment",
  "Cybersecurity",
  "Product Management",
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

const availabilityOptions = ["Weekdays", "Weeknights", "Weekends", "Flexible"];

const roles = ["Frontend", "Backend", "Full-stack", "Design/PM"];

const meetingPreferences = ["In person", "Online", "Either"];

const teammateStatuses = ["Looking for a teammate", "Open to help", "Already in a team"];

const notes = [
  "I am looking for someone reliable to work on a class project.",
  "I enjoy building full-stack apps and learning new tools.",
  "I can help with debugging, planning, and documentation.",
  "I am interested in hackathons, web apps, and research prototypes.",
  "I prefer teammates who communicate clearly and meet deadlines.",
  "I am open to working on weekends if the project is interesting.",
  "I want to collaborate with someone who is strong in backend development.",
  "I can contribute to UI design, frontend development, and testing.",
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSkills(count) {
  const shuffled = [...skills].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function makeEmail(firstName, lastName, index) {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@skillbridge.edu`;
}

function makeProfile(index) {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const location = randomItem(locations);
  const teammatesNeeded = randomNumber(0, 4);

  return {
    name: `${firstName} ${lastName}`,
    email: makeEmail(firstName, lastName, index),

    // Demo owner code for seeded profiles.
    // Use this code to test Edit/Delete/Mark teammate accepted.
    ownerCode: "demo1234",

    major: randomItem(majors),
    city: location.city,
    country: location.country,
    teammatesNeeded,
    skillsToTeach: randomSkills(randomNumber(2, 5)),
    skillsToLearn: randomSkills(randomNumber(2, 5)),
    experienceLevel: randomItem(experienceLevels),
    availability: randomItem(availabilityOptions),
    preferredRole: randomItem(roles),
    meetingPreference: randomItem(meetingPreferences),
    teammateStatus: teammatesNeeded === 0 ? "Already in a team" : randomItem(teammateStatuses),
    notes: randomItem(notes),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function seedSkillProfiles() {
  const collection = await getSkillProfilesCollection();

  const oldCount = await collection.countDocuments();
  console.log(`Old profile count: ${oldCount}`);

  console.log("Deleting old skill profiles...");
  const deleteResult = await collection.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount} old profiles.`);

  console.log("Creating new randomized skill profiles with matching city/country...");
  const profiles = Array.from({ length: 1005 }, (_, index) => makeProfile(index + 1));

  await collection.insertMany(profiles);

  const finalCount = await collection.countDocuments();
  console.log(`Final profile count: ${finalCount}`);

  console.log("Seed complete.");
  console.log("MongoDB now has 1005 fresh skill profiles.");
  console.log("Seeded demo owner code is: demo1234");

  process.exit(0);
}

seedSkillProfiles().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
