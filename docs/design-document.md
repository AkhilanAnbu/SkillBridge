# SkillBridge Design Document

## Project Title

**SkillBridge - Skill Exchange and Project Collaboration**

## Authors

- Akhilan Anbu
- Santhosh Malarvannan

## Course

Northeastern University Web Development Summer 2026

## 1. Project Description

SkillBridge is a full-stack web application that helps students find teammates, exchange skills, and collaborate on projects.

Students often need partners for class projects, hackathons, research prototypes, portfolio projects, or study groups. However, it can be difficult to find the right person through large group chats, Slack channels, or random messages. Students may not know who has the skills they need, who is available, or who is still looking for a team.

SkillBridge solves this problem by giving students a structured platform where they can:

- Create skill profiles.
- Search for teammates by skill, role, availability, city, country, and team status.
- Apply to work with potential teammates through an editable email draft.
- Post project collaboration opportunities.
- Search for projects based on skills, roles, schedule, category, and status.

The project is built using:

- HTML5
- CSS3
- Vanilla JavaScript with ES6 modules
- Node.js
- Express
- MongoDB native driver
- Fetch API

The app uses client-side rendering and stores data in MongoDB collections. The backend exposes Express API routes, and the frontend fetches data from those routes to dynamically render profile cards and project posts.

## 2. Problem Statement

Students need a better way to find project partners and collaborators.

Current problems include:

- Students rely on scattered group chats.
- It is hard to know who is available.
- It is hard to know what skills classmates have.
- Project posts get lost in Slack or WhatsApp threads.
- Students may message many people before finding the right teammate.
- There is no structured way to track teammate needs or collaboration posts.

SkillBridge provides a more organized and searchable system for student collaboration.

## 3. Project Goals

The main goals of SkillBridge are:

1. Help students find teammates based on skills and availability.
2. Help students share what they can teach and what they want to learn.
3. Help students find or post project collaboration opportunities.
4. Store data in MongoDB using multiple collections.
5. Support full CRUD functionality.
6. Use vanilla JavaScript client-side rendering.
7. Keep the interface simple, useful, and easy to understand.
8. Protect profile actions using a basic owner-code system.
9. Deploy the app publicly using Render.
10. Keep the code organized using modules, route files, CSS files, and database files.

## 4. Scope of the Project

SkillBridge has two major modules.

### 4.1 Akhilan's Module: Skill Profiles and Teammate Directory

This module allows students to create and search skill profiles.

Main features:

- Create a skill profile.
- Search profiles by keyword.
- Filter profiles by skill, city, country, availability, experience, role, and team status.
- Show 5 profiles per page using pagination.
- Display more than 1,000 seeded profiles.
- Apply to a profile using an editable email draft.
- Edit a profile.
- Delete a profile.
- Mark a teammate as accepted.
- Track how many teammates are still needed.
- Protect edit, delete, accept, and owner-code update actions using owner codes.
- Use a custom owner-code modal instead of browser prompt.
- Include Show/Hide buttons for owner-code fields.
- Use a yellow bee-themed interface with a custom logo and icons.

### 4.2 Santhosh's Module: Project Collaboration Board

This module allows students to create and search project collaboration posts.

Main features:

- Create a project collaboration post.
- Browse project posts.
- Search posts by keyword.
- Filter posts by required skill, role, category, schedule, and status.
- Edit project posts.
- Delete project posts.
- Store project posts in MongoDB.
- Render posts on the frontend using vanilla JavaScript.

## 5. Implementation Ownership

The project was divided into independent full-stack user stories.

### Akhilan's Full-Stack Responsibilities

Akhilan implemented the Skill Profiles and Teammate Directory module.

This includes:

- Teammate Directory frontend page.
- Skill profile form.
- Skill profile search and filtering.
- Skill profile cards.
- Apply email draft feature.
- Owner-code modal and security flow.
- Teammates-needed tracking.
- Skill profile Express routes.
- Skill profile MongoDB collection.
- Skill profile seed script.
- Yellow bee-themed UI updates for the teammate page.

### Santhosh's Full-Stack Responsibilities

Santhosh implemented the Project Collaboration Board module.

This includes:

- Project Board frontend page.
- Project collaboration form.
- Project post search and filtering.
- Project post cards.
- Project collaboration Express routes.
- Project collaboration MongoDB collection.
- Project seed script.
- Project board layout and UI behavior.

## 6. Target Users

SkillBridge is designed mainly for university students, especially students in web development, computer science, data science, and related technical courses.

Potential users include:

- Students looking for teammates.
- Students who want to share skills.
- Students who need help learning a topic.
- Students posting project ideas.
- Students searching for collaboration opportunities.
- Students working on course projects, hackathons, or personal projects.

## 7. User Personas

### Persona 1: The Student Looking for a Teammate

**Name:** Maya  
**Role:** Graduate student in Computer Science  
**Goal:** Find a reliable teammate for a full-stack class project  
**Frustrations:**

- Group chats are too crowded.
- People do not clearly mention their skills.
- It is hard to know who is still looking for a team.

**How SkillBridge helps:**

Maya can search profiles by skills like MongoDB, Express, JavaScript, and CSS. She can filter by availability and preferred role, then apply to someone directly using the Apply button.

### Persona 2: The Student Who Wants to Teach and Learn

**Name:** Arjun  
**Role:** Student with strong frontend skills  
**Goal:** Teach UI design and learn backend development  
**Frustrations:**

- He does not know who needs frontend help.
- He wants to find someone who can teach backend concepts.
- He wants a simple profile that explains his skills.

**How SkillBridge helps:**

Arjun can create a skill profile listing the skills he can teach and the skills he wants to learn. Other students can find him through filters and contact him.

### Persona 3: The Student Posting a Project Idea

**Name:** Sara  
**Role:** Student building a hackathon project  
**Goal:** Find people for a project idea involving AI and web development  
**Frustrations:**

- Her project idea gets lost in chat messages.
- She needs people with specific skills.
- She wants to show available roles clearly.

**How SkillBridge helps:**

Sara can create a project collaboration post with required skills, open roles, description, schedule, and status. Other students can browse or filter the Project Board to find it.

### Persona 4: The Busy Student With Limited Availability

**Name:** Daniel  
**Role:** Graduate student with part-time work  
**Goal:** Find teammates who are available on weekends  
**Frustrations:**

- Scheduling is difficult.
- Many classmates are only available during weekdays.
- He wants to avoid joining a team with mismatched availability.

**How SkillBridge helps:**

Daniel can use the availability filter to find people who are available on weekends or flexible schedules.

## 8. User Stories

### 8.1 Akhilan's User Stories

#### User Story 1: Create a Skill Profile

As a student, I want to create a skill profile so that other students can find me for collaboration.

Acceptance criteria:

- The student can enter name, email, major, city, country, skills to teach, skills to learn, experience, availability, preferred role, meeting preference, teammate status, teammates needed, and notes.
- The form requires important fields.
- The profile is saved in MongoDB.
- The profile appears in the Teammate Directory after submission.

#### User Story 2: Search for Teammates

As a student, I want to search for teammates by skill and keyword so that I can quickly find classmates who match my project needs.

Acceptance criteria:

- The student can type a keyword.
- The student can search by skill.
- Matching profiles are fetched from the backend.
- Results are displayed as profile cards.

#### User Story 3: Filter Teammates

As a student, I want to filter profiles by city, country, availability, experience, role, and team status so that I can find teammates who are a realistic match.

Acceptance criteria:

- The user can select filter values.
- The app sends the filter values to the backend.
- The backend returns matching profiles.
- The frontend updates the list of profiles.

#### User Story 4: Apply to a Teammate

As a student, I want to apply to a teammate profile so that I can contact that person about working together.

Acceptance criteria:

- Each open profile has an Apply button.
- Clicking Apply opens an application section.
- The app creates a pre-filled email message.
- The user can edit the message before sending.
- The feature uses a `mailto:` link, so the email is not automatically sent without user review.

#### User Story 5: Edit a Profile With Owner Code

As a profile owner, I want to edit my profile only after entering my private owner code so that other users cannot change my profile.

Acceptance criteria:

- The user must enter an owner code before editing.
- The backend verifies the owner code.
- Incorrect owner codes do not open the edit flow.
- Correct owner codes allow the profile form to load.
- The edited profile is saved in MongoDB.

#### User Story 6: Delete a Profile With Owner Code

As a profile owner, I want to delete my profile using my owner code so that only I can remove my data.

Acceptance criteria:

- The user must enter the owner code.
- The backend verifies the owner code.
- Incorrect owner codes do not delete the profile.
- Correct owner codes allow the profile to be deleted.
- The profile list refreshes after deletion.

#### User Story 7: Mark a Teammate as Accepted

As a profile owner, I want to mark a teammate as accepted so that my profile shows fewer remaining teammate openings.

Acceptance criteria:

- The user must enter the owner code.
- The backend verifies the owner code.
- The `teammatesNeeded` count decreases.
- If the count reaches zero, the profile shows that the teammate need has been filled.

#### User Story 8: Update Owner Code

As a profile owner, I want to update my owner code after verifying the current one so that I can change my private code when needed.

Acceptance criteria:

- The user enters the current owner code before editing.
- The user can change the visible owner-code field in the form.
- The backend verifies the current code before saving the new code.
- Future protected actions require the new owner code.

### 8.2 Santhosh's User Stories

#### User Story 1: Create a Project Collaboration Post

As a student, I want to create a project post so that I can find classmates who want to work on my idea.

Acceptance criteria:

- The student can enter project title, category, required skills, available roles, description, schedule, status, and contact details.
- The post is stored in the `projectCollaborations` collection.
- The post appears on the Project Board.

#### User Story 2: Browse Project Posts

As a student, I want to browse project posts so that I can find projects that interest me.

Acceptance criteria:

- The frontend fetches project posts from the backend.
- Posts are rendered on the client side.
- Each post shows useful information about the project.

#### User Story 3: Filter Project Posts

As a student, I want to filter project posts by skill, role, category, schedule, and status so that I can find projects that match my interests.

Acceptance criteria:

- The user can enter or select filters.
- The backend returns matching project posts.
- The frontend updates the displayed project cards.

#### User Story 4: Edit a Project Post

As a student who created a project post, I want to edit the post so that I can update project details when the project changes.

Acceptance criteria:

- The user can load an existing project post into the form.
- The user can update the fields.
- The backend saves the updated post.
- The frontend refreshes after the update.

#### User Story 5: Delete a Project Post

As a student, I want to delete an outdated project post so that the board stays clean and useful.

Acceptance criteria:

- The user can delete a project post.
- The backend removes it from MongoDB.
- The frontend refreshes after deletion.

## 9. Information Architecture

The app contains three main public pages.

### Home Page

Purpose:

- Introduce SkillBridge.
- Explain the value of the app.
- Link users to the Teammate Directory and Project Board.
- Present the overall yellow bee-themed design.

Main content:

- Hero section.
- Project overview.
- Navigation links.
- Feature cards or introduction sections.

### Teammate Directory Page

Purpose:

- Help users find teammates.
- Let users create skill profiles.
- Let users apply to profiles.
- Let profile owners manage their profiles.

Main content:

- Search filters.
- How it works guide.
- Profile results.
- Pagination.
- Apply section.
- Create/edit profile form.
- Owner-code modal.

### Project Board Page

Purpose:

- Help users find project collaboration opportunities.
- Let users post and manage project requests.

Main content:

- Search and filter controls.
- Project post cards.
- Create/edit project form.
- Project details.

## 10. Data Design

### 10.1 `skillProfiles` Collection

The `skillProfiles` collection stores teammate profile data.

Example document structure:

```json
{
  "name": "Maya Patel",
  "email": "maya.patel@skillbridge.edu",
  "ownerCode": "demo1234",
  "major": "Computer Science",
  "city": "Boston",
  "country": "USA",
  "teammatesNeeded": 2,
  "skillsToTeach": ["JavaScript", "CSS", "React"],
  "skillsToLearn": ["MongoDB", "Express"],
  "experienceLevel": "Intermediate",
  "availability": "Weekends",
  "preferredRole": "Frontend",
  "meetingPreference": "Either",
  "teammateStatus": "Looking for a teammate",
  "notes": "I am looking for someone reliable to work on a class project.",
  "createdAt": "2026-06-20T00:00:00.000Z",
  "updatedAt": "2026-06-20T00:00:00.000Z"
}
```

CRUD operations:

- Create profile: `POST /api/skill-profiles`
- Read/search/filter profiles: `GET /api/skill-profiles`
- Verify owner code: `POST /api/skill-profiles/:id/verify-owner`
- Update profile: `PUT /api/skill-profiles/:id`
- Delete profile: `DELETE /api/skill-profiles/:id`

### 10.2 `projectCollaborations` Collection

The `projectCollaborations` collection stores project board posts.

Example document structure:

```json
{
  "title": "AI Study Planner",
  "category": "Web App",
  "requiredSkills": ["Node.js", "MongoDB", "UI Design"],
  "availableRoles": ["Backend", "Frontend"],
  "description": "A project to help students plan study sessions using AI-assisted scheduling.",
  "schedule": "Weekends",
  "status": "Open",
  "contact": "student@example.com",
  "createdAt": "2026-06-20T00:00:00.000Z",
  "updatedAt": "2026-06-20T00:00:00.000Z"
}
```

CRUD operations:

- Create project post: `POST /api/project-collaborations`
- Read/search/filter project posts: `GET /api/project-collaborations`
- Update project post: `PUT /api/project-collaborations/:id`
- Delete project post: `DELETE /api/project-collaborations/:id`

## 11. API Design

### Skill Profile API

```text
GET    /api/skill-profiles
POST   /api/skill-profiles
POST   /api/skill-profiles/:id/verify-owner
PUT    /api/skill-profiles/:id
DELETE /api/skill-profiles/:id
```

Search and filter parameters:

```text
search
skill
city
country
teamAvailability
availability
experienceLevel
preferredRole
teammateStatus
```

### Project Collaboration API

```text
GET    /api/project-collaborations
POST   /api/project-collaborations
PUT    /api/project-collaborations/:id
DELETE /api/project-collaborations/:id
```

Possible filter parameters:

```text
search
requiredSkill
availableRole
category
schedule
status
```

## 12. User Flow

### 12.1 Teammate Directory Flow

```text
User opens Teammate Directory
        |
        v
User searches or filters profiles
        |
        v
Matching profiles are fetched from MongoDB
        |
        v
Frontend renders profile cards
        |
        v
User chooses an action:
        |
        |-- Apply
        |     |
        |     v
        |   App opens editable email draft
        |
        |-- Edit / Delete / Mark Accepted
              |
              v
            User enters owner code
              |
              v
            Backend verifies owner code
              |
              v
            Protected action is completed
```

### 12.2 Project Board Flow

```text
User opens Project Board
        |
        v
User browses or filters project posts
        |
        v
Matching posts are fetched from MongoDB
        |
        v
Frontend renders project cards
        |
        v
User creates, edits, or deletes a project post
        |
        v
Backend updates MongoDB
        |
        v
Frontend refreshes the project board
```

## 13. Design Mockups

The final app uses a yellow bee-inspired theme with rounded cards, clear form sections, and simple page navigation.

### 13.1 Home Page Mockup

```text
+-------------------------------------------------------------+
| SkillBridge Logo          Home | Teammates | Project Board  |
+-------------------------------------------------------------+
|                                                             |
|  SkillBridge                                                |
|  Find people to build with, not just people to find.         |
|                                                             |
|  [Explore Teammates]    [View Project Board]                |
|                                                             |
+-------------------------------------------------------------+
|  Feature Card 1       Feature Card 2       Feature Card 3   |
|  Skill Profiles       Project Posts        Collaboration    |
+-------------------------------------------------------------+
```

Final screenshot:

```md
![SkillBridge home page](docs/homepage.png)
```

### 13.2 Teammate Directory Mockup

```text
+-------------------------------------------------------------+
| SkillBridge Logo          Home | Teammates | Project Board  |
+-------------------------------------------------------------+
| Teammate Directory                              [Add Profile]|
| Find classmates by skills, role, city, and availability.     |
+-----------------------------+-------------------------------+
| Search Filters              | Profiles                      |
|                             | +---------------------------+ |
| Keyword                     | | Profile Card              | |
| Skill                       | | Name, major, location     | |
| City                        | | Skills to teach/learn     | |
| Country                     | | [Apply] [Edit] [Delete]   | |
| Availability                | +---------------------------+ |
| Experience                  |                               |
| Role                        | +---------------------------+ |
| Status                      | | Profile Card              | |
| [Search] [Clear]            | +---------------------------+ |
|                             |                               |
| How it works                | Page 1 of many               |
| [Icon] Create profile       | [Previous 5] [Next 5]        |
| [Icon] Search people        |                               |
| [Icon] Start collaborating  |                               |
+-----------------------------+-------------------------------+
| Create/Edit Skill Profile Form                              |
| Name | Email | Owner Code | Skills | Availability | Save     |
+-------------------------------------------------------------+
```

Final screenshot:

```md
![SkillBridge teammate directory](docs/teammates.png)
```

### 13.3 Add Profile Form Mockup

```text
+-------------------------------------------------------------+
| Create a Skill Profile                                      |
+-------------------------------------------------------------+
| Name                  | Email                               |
| Owner Code [Show]     | Major                               |
| City                  | Country                             |
| Teammates Needed      | Experience                          |
| Availability          | Preferred Role                      |
| Meeting Preference    | Team Status                         |
| Skills I can teach                                          |
| Skills I want to learn                                      |
| Short note                                                  |
|                                                             |
| [Save Profile] [Cancel Edit]                                |
+-------------------------------------------------------------+
```

Final screenshot:

```md
![Add profile form](docs/addprofiles.png)
```

### 13.4 Owner Code Modal Mockup

```text
+--------------------------------------+
| Profile owner code                   |
| Enter the profile owner code to edit |
|                                      |
| Owner code [........] [Show]         |
|                                      |
| [Continue] [Cancel]                  |
+--------------------------------------+
```

### 13.5 Project Board Mockup

```text
+-------------------------------------------------------------+
| SkillBridge Logo          Home | Teammates | Project Board  |
+-------------------------------------------------------------+
| Project Board                                               |
| Browse project collaboration opportunities.                 |
+-----------------------------+-------------------------------+
| Project Filters             | Project Posts                 |
| Keyword                     | +---------------------------+ |
| Required Skill              | | Project Card              | |
| Available Role              | | Title, category, status   | |
| Category                    | | Required skills, roles    | |
| Schedule                    | | [Edit] [Delete]           | |
| Status                      | +---------------------------+ |
| [Search] [Clear]            |                               |
+-----------------------------+-------------------------------+
| Create/Edit Project Collaboration Form                      |
+-------------------------------------------------------------+
```

Final screenshot:

```md
![Project board page](docs/projectboard.png)
```

## 14. Visual Design System

### Theme

SkillBridge uses a yellow bee-inspired theme because the name suggests connection, teamwork, and activity. The design is meant to feel friendly and student-focused rather than corporate.

### Color Palette

```text
Bee Yellow:              #ffd400
Warm Border Yellow:      #e5b900
Soft Cream Background:   #fff8d6
Light Yellow Surface:    #fff5be
Dark Olive Text:         #202412
Muted Text:              #5f5a35
Danger/Delete Red:       #9f3a32
White:                   #ffffff
```

### Typography

The app uses clean system fonts for readability.

Goals:

- Easy to read on desktop and laptop screens.
- Clear labels for form inputs.
- Strong headings for page sections.
- Simple card text for quick scanning.

### Components

Main UI components:

- Header navigation
- Hero section
- Filter panel
- Profile cards
- Project cards
- Forms
- Buttons
- Pagination controls
- Owner-code modal
- Status labels
- Guide cards with icons

### Button Design

Buttons use standard `<button>` elements.

Button types:

- Primary yellow buttons for main actions.
- Secondary buttons for lower priority actions.
- Danger button styling for delete actions.
- Disabled button state for filled profiles.

### Card Design

Cards use:

- Rounded corners
- Light yellow or cream backgrounds
- Clear spacing
- Organized profile/project details
- Action buttons grouped together

## 15. Accessibility and Usability

Accessibility and usability considerations:

- Standard HTML form elements are used.
- Labels are connected to inputs.
- Buttons are real `<button>` elements, not clickable `<div>` elements.
- Images include alt text.
- Navigation uses semantic `<nav>`.
- Main content uses semantic `<main>`.
- Sections are grouped with semantic `<section>`.
- The owner-code modal uses dialog-related attributes.
- The UI uses readable contrast between text and background.
- Pagination keeps the page from becoming too overwhelming.
- The How It Works section explains the teammate workflow.
- The Apply feature opens a draft instead of sending automatically, giving users control.

## 16. Security and Data Safety

SkillBridge does not implement full user authentication because this is a course project. However, Akhilan's module includes a basic owner-code system for safer profile management.

Owner-code protected actions:

- Edit profile
- Delete profile
- Mark teammate accepted
- Update owner code

Security decisions:

- The owner code is required before protected actions.
- The backend verifies the owner code.
- The frontend does not rely only on visual checks.
- Seeded demo profiles use `demo1234` for testing.
- The app uses `.env` for database credentials.
- Real MongoDB credentials should not be committed to GitHub.
- `.env.example` is included only as a safe template.

Limitations:

- Owner codes are not a replacement for real authentication.
- Owner codes are suitable for this project scope, but a production system should use accounts, sessions, hashing, and stronger access control.

## 17. Technical Architecture

### Frontend

The frontend uses:

- HTML pages
- CSS modules/files
- Vanilla JavaScript ES6 modules
- Fetch API
- Client-side rendering

Frontend files are organized by purpose:

```text
public/
├── css/
├── images/
├── js/
├── index.html
├── teammates.html
└── project-board.html
```

### Backend

The backend uses:

- Node.js
- Express
- ES modules
- MongoDB native driver
- REST-style API routes

Backend files are organized by purpose:

```text
db/
routes/
scripts/
server.js
```

### Database

The database uses MongoDB with two main collections:

- `skillProfiles`
- `projectCollaborations`

The project uses the MongoDB native driver instead of Mongoose.

## 18. Module Organization

The code is separated into modules to keep the project organized.

Examples:

- `db/mongoClient.js` handles database connection.
- `routes/skillProfiles.routes.js` handles skill profile API routes.
- `routes/projectCollaborations.routes.js` handles project board API routes.
- `public/js/api.js` handles frontend fetch helpers.
- `public/js/dom.js` handles common DOM helpers.
- `public/js/profileForm.js` handles the skill profile form.
- `public/js/profileList.js` handles profile list rendering.
- `public/js/teammatesPage.js` connects the teammate page modules.
- Project board JavaScript is separated into its own module files.

## 19. Forms

The project includes multiple forms.

Akhilan's forms:

- Skill profile create/edit form.
- Search filter form.
- Apply email draft form.
- Owner-code modal form.

Santhosh's forms:

- Project collaboration create/edit form.
- Project board filter form.

These forms satisfy the requirement for user input and allow the app to support CRUD operations.

## 20. Client-Side Rendering

SkillBridge uses client-side rendering with vanilla JavaScript.

Process:

1. The HTML page loads.
2. JavaScript modules run in the browser.
3. The frontend sends fetch requests to Express API routes.
4. The backend gets data from MongoDB.
5. The frontend receives JSON data.
6. JavaScript creates and inserts profile/project cards into the page.

No React, template engines, or server-side rendering are used.

## 21. Testing Plan

The project was tested using the following checks.

### Teammate Directory Testing

- Create a new profile.
- Search by keyword.
- Filter by skill.
- Filter by city and country.
- Filter by availability.
- Confirm only 5 profiles show per page.
- Use pagination buttons.
- Click Apply and confirm an editable email draft opens.
- Try editing with an incorrect owner code.
- Confirm incorrect owner code does not allow editing.
- Try editing with the correct owner code.
- Confirm the form opens and updates save.
- Change owner code and test the new code.
- Delete a profile with the correct owner code.
- Mark teammate accepted and confirm teammate count decreases.
- Confirm filled profiles show a filled state.

### Project Board Testing

- Create a project post.
- Search project posts.
- Filter by required skill.
- Filter by role.
- Filter by category.
- Filter by schedule.
- Filter by status.
- Edit a project post.
- Delete a project post.

### Backend Testing

- Confirm `GET` routes return JSON.
- Confirm `POST` routes create records.
- Confirm `PUT` routes update records.
- Confirm `DELETE` routes remove records.
- Confirm MongoDB collections contain expected data.
- Confirm seeded profiles exceed 1,000 records.

### Code Quality Testing

- Run Prettier formatting.
- Run ESLint.
- Confirm `.env` is not committed.
- Confirm `.env.example` exists.
- Confirm package.json includes project dependencies.
- Confirm MIT license exists.
- Confirm no Mongoose or template engines are used.
- Confirm backend uses ES modules instead of CommonJS `require`.

## 22. Usefulness for Final Users

SkillBridge is useful because it solves a real student problem: finding collaborators.

A final user would use the app because:

- It is faster than searching through group chats.
- It allows filtering by practical criteria.
- It shows whether a profile still needs teammates.
- It makes applying to a teammate simple.
- It helps students discover project opportunities.
- It keeps collaboration information structured.
- It supports both skill exchange and project discovery.

## 23. Future Improvements

Possible future improvements:

- Add real user accounts and login.
- Hash owner codes instead of storing them directly.
- Add profile images.
- Add direct in-app messaging.
- Add saved/favorite profiles.
- Add notifications when someone applies.
- Add project application tracking.
- Add admin moderation.
- Add better mobile layout refinements.
- Add sorting by newest, most relevant, or most active.
- Add tags for course numbers and university programs.

## 24. AI Usage Disclosure

AI tools were used as a helper during the project process.

AI was used for:

- Project planning.
- Debugging frontend and backend issues.
- Improving README and documentation wording.
- Checking the rubric coverage.
- Suggesting UI text.
- Generating ideas for yellow-themed visual icons.

The final implementation was reviewed, tested, edited, and customized by the team. AI was not used as a replacement for understanding or submitting unreviewed code.

## 25. Rubric Coverage Summary

This design document includes the required design-document components:

- Project description
- User personas
- User stories
- Design mockups

The full project also includes:

- Node.js and Express backend
- MongoDB native driver
- Two MongoDB collections
- CRUD operations
- More than 1,000 database records
- Vanilla JavaScript client-side rendering
- ES6 modules
- Forms
- Public deployment
- ESLint
- Prettier
- MIT license
- README
- No exposed credentials
- No Mongoose
- No template engines
- No CommonJS `require` in the backend
