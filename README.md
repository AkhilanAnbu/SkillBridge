# SkillBridge - Skill Exchange and Project Collaboration

## Authors

- Akhilan Anbu
- Santhosh Malarvannan

## Class Link

Northeastern University Web Development Summer 2026 course.
https://northeastern.instructure.com/courses/249954

## Project Objective

SkillBridge helps students find teammates, exchange skills, and collaborate on projects. It has two full-stack modules: Akhilan's Skill Profiles and Teammate Search, and Santhosh's Project Collaboration Board.

## Screenshot

Home Page:
![SkillBridge screenshot](docs/homepage.png)

Teammate Directory:
![teammate page](docs/teammate.png)

Add Profile:
![add profile](docs/addprofile.png)

Project Board:
![project board](docs/projectboard.png)

## Akhilan's Features

- Create a skill profile.
- Search and filter profiles by keyword, skill, availability, experience, role, and teammate status.
- Edit an existing profile.
- Delete an existing profile.
- Store profile data in the `skillProfiles` MongoDB collection.
- Use Express CRUD routes and client-side rendering with vanilla JavaScript ES6 modules.

## Santhosh's Features

- Create a project collaboration post with a form.
- Browse and filter posts by keyword, required skill, available role, category, schedule, and status.
- Edit an existing project post.
- Delete an outdated project post.
- Store posts in the `projectCollaborations` MongoDB collection.
- Express CRUD routes with client-side rendering using vanilla JavaScript ES6 modules.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript with ES6 modules
- Node.js
- Express
- MongoDB native driver
- Fetch API
- ESLint
- Prettier

## How to Run

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Add your MongoDB connection string in `.env`:

```bash
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=skillbridge
PORT=3000
```

Run the server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Seed Data

To add more than 1,000 test profiles:

```bash
npm run seed:skills
```

## Seed Project Posts

To add sample project collaboration posts:

```bash
npm run seed:projects
```

## Code Quality

Format code:

```bash
npm run format
```

Check linting:

```bash
npm run lint
```

## AI Usage Disclosure

AI was used as a helper for planning the project structure and checking the rubric. The implementation was reviewed, edited, tested, and customized for our SkillBridge project.