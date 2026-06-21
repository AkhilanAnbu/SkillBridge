import { saveProject } from "./projectApi.js";
import { getElement, showMessage } from "./dom.js";

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formToProject(form) {
  const formData = new FormData(form);

  return {
    title: formData.get("title"),
    creatorName: formData.get("creatorName"),
    creatorEmail: formData.get("creatorEmail"),
    category: formData.get("category"),
    description: formData.get("description"),
    schedule: formData.get("schedule"),
    openPositions: formData.get("openPositions"),
    status: formData.get("status"),
    requiredSkills: splitList(formData.get("requiredSkills")),
    learningOpportunities: splitList(formData.get("learningOpportunities")),
    availableRoles: splitList(formData.get("availableRoles")),
    currentMembers: splitList(formData.get("currentMembers")),
  };
}

function listToText(list) {
  return Array.isArray(list) ? list.join(", ") : "";
}

export function setupProjectForm(afterSave) {
  const form = getElement("#project-form");
  const projectId = getElement("#project-id");
  const title = getElement("#form-title");
  const cancelButton = getElement("#cancel-edit");

  function resetForm() {
    form.reset();
    projectId.value = "";
    title.textContent = "Create a Project Post";
    cancelButton.hidden = true;
  }

  function editProject(project) {
    projectId.value = project._id;
    form.elements.title.value = project.title || "";
    form.elements.creatorName.value = project.creatorName || "";
    form.elements.creatorEmail.value = project.creatorEmail || "";
    form.elements.category.value = project.category || "";
    form.elements.description.value = project.description || "";
    form.elements.schedule.value = project.schedule || "";
    form.elements.openPositions.value = project.openPositions || "";
    form.elements.status.value = project.status || "";
    form.elements.requiredSkills.value = listToText(project.requiredSkills);
    form.elements.learningOpportunities.value = listToText(project.learningOpportunities);
    form.elements.availableRoles.value = listToText(project.availableRoles);
    form.elements.currentMembers.value = listToText(project.currentMembers);

    title.textContent = `Edit "${project.title}"`;
    cancelButton.hidden = false;
    getElement("#project-form-card").scrollIntoView({ behavior: "smooth" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await saveProject(formToProject(form), projectId.value);
      showMessage(projectId.value ? "Project updated" : "Project created");
      resetForm();
      await afterSave();
    } catch (error) {
      showMessage(error.message);
    }
  });

  cancelButton.addEventListener("click", resetForm);

  return { editProject };
}
