import { getElement } from "./dom.js";
import { setupProjectForm } from "./projectForm.js";
import { setupProjectList } from "./projectList.js";

const projectList = setupProjectList((project) => projectForm.editProject(project));
const projectForm = setupProjectForm(() => projectList.loadProjects());

getElement("#add-project-link").addEventListener("click", () => {
  getElement("#project-form-card").scrollIntoView({ behavior: "smooth" });
});

projectList.loadProjects();
