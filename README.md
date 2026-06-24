# SkillBridge - Skill Exchange and Project Collaboration

## Authors

- Akhilan Anbu
- Santhosh Malarvannan

## Class Link

Northeastern University Web Development Summer 2026  
Course link: https://northeastern.instructure.com/courses/249954

## Live Deployment

Deployed website: https://skillbridge-fna5.onrender.com/

Main pages:

- Home: https://skillbridge-fna5.onrender.com/
- Teammate Directory: https://skillbridge-fna5.onrender.com/teammates.html
- Project Board: https://skillbridge-fna5.onrender.com/project-board.html
- Skill Profiles API: https://skillbridge-fna5.onrender.com/api/skill-profiles
- Project Collaborations API: https://skillbridge-fna5.onrender.com/api/project-collaborations

## Public Demo Video

Demo video: https://www.youtube.com/watch?v=ro99K7LrvsY

The public narrated demo video shows:

- The deployed Render website.
- The Home page.
- Creating a skill profile.
- Searching and filtering teammate profiles.
- Applying to a teammate profile.
- Editing, deleting, marking accepted, and updating profiles using the owner code.
- Creating, searching, editing, and deleting project collaboration posts.
- MongoDB-backed data being rendered on the client side.

## Project Objective

SkillBridge is a full-stack web application that helps students find teammates, exchange skills, and collaborate on projects.

Students often need partners for course projects, hackathons, research prototypes, study groups, or personal software ideas, but it can be difficult to find the right person through large group chats or scattered messages. SkillBridge makes this easier by giving students one place to create skill profiles, search for teammates, and post project collaboration opportunities.

The project has two full-stack modules:

1. **Akhilan's Skill Profiles and Teammate Directory**
   - Students can create a skill profile.
   - Students can list what they can teach.
   - Students can list what they want to learn.
   - Students can search for classmates based on skills, location, role, availability, and team status.
   - Students can apply to a profile using an editable email draft.
   - Profile owners can protect updates using an owner code.

2. **Santhosh's Project Collaboration Board**
   - Students can create project collaboration posts.
   - Students can describe what they are building.
   - Students can list required skills and available roles.
   - Students can search, filter, edit, and delete project opportunities.

Together, SkillBridge supports both sides of collaboration: finding people and finding projects.

## Screenshots

### Home Page

![SkillBridge home page](docs/homepage.png)

### Teammate Directory

![SkillBridge teammate directory](docs/teammates.png)

### Add Skill Profile

![Add profile form](docs/addprofiles.png)

### Project Board

![Project board page](docs/projectboard.png)

## Design Document

The design document is included in the repository at:

```text
docs/design-document.md
```

It covers the required design planning materials:

- Project description.
- User personas.
- User stories written as realistic use cases.
- Design mockups and page planning.
- Feature breakdown for both full-stack modules.
- Notes about the final yellow bee-themed visual direction.
- Notes about the teammate owner-code protection flow.

## Main Features

### Akhilan's Module: Skill Profiles and Teammate Directory

Akhilan's side focuses on helping students find people to work with based on skills, availability, location, and teammate needs.

#### Features Implemented

- Create a skill profile using a form.
- Store profiles in the `skillProfiles` MongoDB collection.
- Display profiles using client-side rendering with vanilla JavaScript.
- Search profiles by keyword.
- Filter profiles by:
  - Skill.
  - City.
  - Country / county.
  - Availability.
  - Experience level.
  - Preferred role.
  - Team status.
  - Whether teammates are still needed.
- Display more than 1,000 seeded skill profiles.
- Show only 5 profiles per page using pagination.
- Add city and country fields to make teammate search more realistic.
- Add a `teammatesNeeded` field to show how many teammates are still needed.
- Add an **Apply** button that opens an editable email draft.
- Add **Mark teammate accepted** to reduce the number of teammates still needed.
- Display a filled state when a profile no longer needs teammates.
- Edit existing profiles.
- Delete existing profiles.
- Add a yellow bee-themed visual design.
- Add a custom bee favicon and logo.
- Add a “How it works” guide section with yellow themed icons.
- Use standard HTML forms, labels, buttons, inputs, and semantic sections.

#### Owner Code Security Feature

To prevent random users from editing or deleting any profile, Akhilan's module includes a simple owner-code protection system.

Each profile has a private `ownerCode`.

Protected actions include:

- Editing a profile.
- Deleting a profile.
- Marking a teammate as accepted.
- Updating the owner code.

How the owner code system works:

- When a user creates a profile, they must create a private owner code.
- When a user tries to edit, delete, or mark a teammate as accepted, the app asks for the owner code.
- The frontend uses a custom owner-code modal instead of the browser `prompt()` function.
- The backend verifies the owner code before allowing protected actions.
- Seeded demo profiles use the demo owner code `demo1234`.
- The owner code field includes a Show/Hide button so users can check what they typed.
- The app supports changing the owner code after verifying the current owner code.
- A verification route prevents the edit form from opening when an incorrect owner code is entered.

This is a course-project level ownership check, not a full production authentication system, but it improves data safety compared to allowing open edits.

### Santhosh's Module: Project Collaboration Board

Santhosh's side focuses on helping students post and find project collaboration opportunities.

#### Features Implemented

- Create a project collaboration post using a form.
- Store project posts in the `projectCollaborations` MongoDB collection.
- Browse project posts using client-side rendering.
- Search project posts by keyword.
- Filter project posts by:
  - Required skill.
  - Available role.
  - Category.
  - Schedule.
  - Status.
- Edit existing project posts.
- Delete outdated project posts.
- Seed sample project collaboration records.
- Use Express CRUD routes.
- Use MongoDB native driver.
- Use vanilla JavaScript ES6 modules for frontend behavior.

## Database Collections

The project uses MongoDB with two main collections. Both collections support CRUD operations through Express routes.

### Collection 1: `skillProfiles`

Used by Akhilan's Teammate Directory.

Example fields:

```text
name
email
ownerCode
major
city
country
teammatesNeeded
skillsToTeach
skillsToLearn
experienceLevel
availability
preferredRole
meetingPreference
teammateStatus
notes
createdAt
updatedAt
```

CRUD support:

- Create skill profile.
- Read, search, and filter skill profiles.
- Update skill profile.
- Delete skill profile.
- Verify owner code before protected actions.

### Collection 2: `projectCollaborations`

Used by Santhosh's Project Board.

Example fields:

```text
title
category
requiredSkills
availableRoles
description
schedule
status
contact
createdAt
updatedAt
```

CRUD support:

- Create project collaboration post.
- Read, search, and filter project posts.
- Update project post.
- Delete project post.

## Tech Stack

- HTML5.
- CSS3.
- Vanilla JavaScript with ES6 modules.
- Node.js.
- Express.
- MongoDB native driver.
- Fetch API.
- ESLint.
- Prettier.
- Render for deployment.

## Project Requirements Covered

This project was built to satisfy the Project 2 backend rubric.

Implemented requirements:

- Node.js backend.
- Express server.
- MongoDB database.
- MongoDB native driver.
- At least two MongoDB collections.
- CRUD operations on both collections.
- Client-side rendering using vanilla JavaScript.
- ES6 module organization.
- At least one form.
- Multiple forms across the application.
- Public deployment on Render.
- More than 1,000 database records through seeded skill profiles.
- CSS organized into separate files.
- Database connector separated into its own module.
- Routes separated into route files.
- Frontend JavaScript separated into modules.
- ESLint configuration included.
- Prettier formatting included.
- Standard HTML components used for forms, buttons, inputs, and labels.
- No Mongoose.
- No template engines such as EJS, Pug, Jade, or Handlebars.
- No CommonJS `require` in backend code.
- No exposed MongoDB credentials in the repository.
- `package.json` included with dependencies and scripts.
- MIT License included.
- README includes authors, class link, objective, screenshots, and build instructions.

## Rubric Coverage Checklist

| Rubric Requirement                                                            | Where It Is Covered                                                      |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Design document with project description, personas, user stories, and mockups | `docs/design-document.md`                                                |
| App accomplishes approved project requirements                                | Skill profiles module and project board module                           |
| Usable app with instructions                                                  | README usage instructions and in-page UI guidance                        |
| Useful app for final users                                                    | Students can find teammates, exchange skills, and post project requests  |
| ESLint config and no lint errors                                              | `eslint.config.js` and `npm run lint`                                    |
| Organized code structure                                                      | `db/`, `routes/`, `public/js/`, `public/css/`, `scripts/`, `docs/`       |
| JavaScript organized in modules                                               | ES6 modules across backend and frontend files                            |
| Client-side rendering with vanilla JavaScript                                 | Profile cards and project posts rendered with Fetch API and DOM updates  |
| At least one form                                                             | Skill profile form and project collaboration form                        |
| Public deployment                                                             | Render deployment link included above                                    |
| At least two Mongo collections with CRUD                                      | `skillProfiles` and `projectCollaborations`                              |
| Database has more than 1,000 records                                          | `seedSkillProfiles.js` creates 1,005 skill profiles                      |
| Node + Express backend                                                        | `server.js` and route files                                              |
| Prettier formatting                                                           | `npm run format`                                                         |
| Standard tags instead of non-standard components                              | Buttons, forms, inputs, labels, sections, and semantic HTML              |
| CSS organized by modules                                                      | `base.css`, `teammates.css`, `project-board.css`, `index.css`            |
| Clear README                                                                  | This file                                                                |
| No exposed secrets                                                            | `.env` excluded; `.env.example` included                                 |
| Package file included                                                         | `package.json`                                                           |
| MIT License                                                                   | `LICENSE`                                                                |
| No leftover unused starter files                                              | Project-specific routes, favicon, and assets only                        |
| Google Form submission                                                        | Submit final URL, repo, thumbnail, and video link through the class form |
| Public narrated demo video                                                    | Replace the demo link above before submission                            |
| Code freeze / final deployment                                                | Push final code to `main` and deploy latest Render commit before class   |
| No CommonJS `require`                                                         | Backend uses ES module `import` syntax                                   |
| No Mongoose or template engines                                               | MongoDB native driver and static HTML only                               |
| Code review                                                                   | Complete required course code review before final submission             |

## Project Structure

```text
skillbridge-akhilan-simple/
├── db/
│   └── mongoClient.js
├── docs/
│   ├── design-document.md
│   ├── homepage.png
│   ├── teammates.png
│   ├── addprofiles.png
│   └── projectboard.png
├── public/
│   ├── css/
│   │   ├── base.css
│   │   ├── index.css
│   │   ├── teammates.css
│   │   └── project-board.css
│   ├── images/
│   │   ├── skillbridge-bee-logo.png
│   │   ├── how-profile.png
│   │   ├── how-search.png
│   │   └── how-collab.png
│   ├── js/
│   │   ├── api.js
│   │   ├── dom.js
│   │   ├── teammatesPage.js
│   │   ├── profileForm.js
│   │   ├── profileList.js
│   │   └── projectList.js
│   ├── index.html
│   ├── teammates.html
│   └── project-board.html
├── routes/
│   ├── skillProfiles.routes.js
│   └── projectCollaborations.routes.js
├── scripts/
│   ├── seedSkillProfiles.js
│   ├── seedProjectCollaborations.js
│   └── clearSkillProfiles.js
├── .env.example
├── eslint.config.js
├── package.json
├── package-lock.json
├── server.js
├── LICENSE
└── README.md
```

## How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create the environment file

For macOS or Git Bash:

```bash
cp .env.example .env
```

For Windows PowerShell:

```bash
copy .env.example .env
```

### 3. Add MongoDB connection details

Open `.env` and add your MongoDB connection string.

Example:

```bash
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=skillbridge
PORT=3000
```

Do not commit `.env` to GitHub.

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Seed Data

### Seed Skill Profiles

To add more than 1,000 randomized skill profiles:

```bash
npm run seed:skills
```

This creates seeded profiles in the `skillProfiles` collection.

Demo owner code for seeded profiles:

```text
demo1234
```

### Seed Project Posts

To add sample project collaboration posts:

```bash
npm run seed:projects
```

This creates sample records in the `projectCollaborations` collection.

## Code Quality Commands

Format code with Prettier:

```bash
npm run format
```

Check linting with ESLint:

```bash
npm run lint
```

Before final submission, both commands should complete successfully.

## Security and Secrets

The project uses environment variables for sensitive configuration.

The repository should not include:

- MongoDB username.
- MongoDB password.
- Full private MongoDB connection string.
- `.env` file.

The repository includes `.env.example` to show the required environment variables without exposing real credentials.

Example `.env.example` content:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=skillbridge
PORT=3000
```

Before final submission, confirm `.env` is not tracked:

```bash
git ls-files | findstr ".env"
```

The command should not show `.env`. It is okay if it shows `.env.example`.

## API Overview

### Skill Profiles API

Base route:

```text
/api/skill-profiles
```

Main operations:

```text
GET    /api/skill-profiles
POST   /api/skill-profiles
POST   /api/skill-profiles/:id/verify-owner
PUT    /api/skill-profiles/:id
DELETE /api/skill-profiles/:id
```

### Project Collaborations API

Base route:

```text
/api/project-collaborations
```

Main operations:

```text
GET    /api/project-collaborations
POST   /api/project-collaborations
PUT    /api/project-collaborations/:id
DELETE /api/project-collaborations/:id
```

## How to Use the App

### Teammate Directory

1. Open the Teammate Directory page.
2. Use the search filters to find students by skill, city, role, availability, or teammate status.
3. Click **Apply** to open an editable email draft.
4. Click **Add my profile** to create your own profile.
5. Create a private owner code when adding a profile.
6. Use the owner code to edit, delete, or mark a teammate as accepted.
7. If enough teammates are found, the profile shows a filled state.

### Project Board

1. Open the Project Board page.
2. Browse available project collaboration posts.
3. Filter posts by category, required skills, schedule, role, or status.
4. Add a new project collaboration post using the form.
5. Edit or delete posts when project details change.

## Design Notes

The visual design uses a warm yellow bee-inspired theme to match the SkillBridge name. The interface is intended to feel friendly, clear, and easy to use for students.

Design choices include:

- Yellow accent color for buttons, borders, and highlights.
- Bee logo and favicon.
- Rounded cards for profiles and project posts.
- Clear form labels and input fields.
- Client-side rendered profile cards.
- Pagination to avoid showing too many profiles at once.
- A “How it works” section to explain the teammate workflow.
- Simple yellow themed icons for the teammate page.
- Owner-code modal for protected teammate actions.

## Final Submission Checklist

Before submitting the Google Form, confirm these items:

- [ ] `README.md` contains the final public narrated demo video link.
- [ ] `docs/` contains the screenshots used in the README.
- [ ] `docs/design-document.md` includes project description, personas, user stories, and mockups.
- [ ] `.env.example` exists with placeholder values.
- [ ] `.env` is not pushed to GitHub.
- [ ] `npm run format` has been run.
- [ ] `npm run lint` passes without errors.
- [ ] The final code is merged into `main`.
- [ ] The final code is pushed to GitHub.
- [ ] Render is deployed from the latest `main` commit.
- [ ] The live Render pages work.
- [ ] The live API route works.
- [ ] The live database has more than 1,000 skill profiles.
- [ ] The Google Form has the correct website URL, repository URL, thumbnail, and video link.
- [ ] The course code review requirement is completed.

## AI Usage Disclosure

AI tools were used as a helper for planning, debugging and wording. The implementation was created, reviewed, edited, tested, and customized by the team for the SkillBridge project.

AI was used for:

- Project structure planning.
- README drafting.
- Debugging frontend and backend issues.
- Generating basic visual ideas for the yellow-themed guide icons.

The final code, feature decisions, testing, deployment, and customization were completed by the team.

## License

This project uses the MIT License. See the `LICENSE` file for details.
