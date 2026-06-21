# SkillBridge Design Document

## Project Description

SkillBridge is a web application for students who want to exchange skills and find project collaborators. Users can create skill profiles that show what they can teach, what they want to learn, their schedule, and whether they are still looking for a teammate.

## User Personas

### Student Looking for a Teammate

A student in a web development class wants to find someone with a similar schedule and complementary technical skills.

### Developer Looking to Learn

A student or developer wants to contribute skills they already know while learning something new from teammates.

### Project Creator

A user has a project idea and needs collaborators for specific roles.

## User Stories

### Skill Profiles and Teammate Search - Akhilan

- As a user, I want to create a profile with my skills and availability so that others can decide if I am a good teammate.
- As a user, I want to search profiles by skill, experience, availability, role, and teammate status so that I can find a better match faster.
- As a user, I want to edit or delete my profile so that my information stays correct.
- As a professor, I want to filter for students still looking for teammates so that I can help form groups.

### Project Collaboration Board - Santhosh

- As a user, I want to create a project post with required skills, roles, and schedule.
- As a user, I want to browse and filter project posts.
- As a project creator, I want to edit or delete old project posts.

## Design Mockups

### Home Page

- Header with three navigation links.
- Hero section that explains the product.
- Match preview card with a simple animated match meter.
- Three cards showing the steps to use the app.

### Teammate Directory

- Left side filter panel.
- Right side profile results area.
- Profile cards rendered with vanilla JavaScript.
- Profile form below the directory for creating and editing.

### Project Board

- Left side filter panel: keyword, required skill, available role, category, schedule, and status.
- Right side project results area with client-side pagination (10 per page).
- Project cards rendered with vanilla JavaScript modules, showing skills, learning opportunities, roles, schedule, open positions, and status.
- Project form below the board for creating and editing posts.
- Full CRUD stored in the projectCollaborations collection.

## Color Palette

- Brunswick Green: `#344E41`
- Hunter Green: `#3A5A40`
- Fern Green: `#588157`
- Shamrock Green: `#5A9F68`
- Pistachio: `#BBD58E`
