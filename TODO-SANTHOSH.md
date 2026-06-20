# Santhosh Handoff

Akhilan's branch contains the Skill Profiles and Teammate Search module.

Please add the Project Collaboration Board module:

- `projectCollaborations` MongoDB collection
- Express router for project collaboration CRUD
- Project creation/editing form
- Project board page
- Client-side rendering with vanilla JavaScript modules
- Filters by category, required skills, available roles, schedule, and status

Suggested files:

```text
routes/projectCollaborations.routes.js
public/js/projectApi.js
public/js/projectForm.js
public/js/projectBoard.js
public/project-board.html
public/css/project-board.css
```

In `server.js`, import the router and use:

```js
app.use("/api/project-collaborations", projectCollaborationsRouter);
```
