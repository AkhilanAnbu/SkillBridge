import { saveProfile } from "./api.js";
import { getElement, showMessage } from "./dom.js";

function splitSkills(value) {
  return String(value || "")
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function formToProfile(form) {
  const formData = new FormData(form);

  return {
    name: formData.get("name"),
    email: formData.get("email"),
    major: formData.get("major"),
    city: formData.get("city"),
    country: formData.get("country"),
    teammatesNeeded: Number.parseInt(formData.get("teammatesNeeded"), 10) || 0,
    experienceLevel: formData.get("experienceLevel"),
    availability: formData.get("availability"),
    preferredRole: formData.get("preferredRole"),
    meetingPreference: formData.get("meetingPreference"),
    teammateStatus: formData.get("teammateStatus"),
    skillsToTeach: splitSkills(formData.get("skillsToTeach")),
    skillsToLearn: splitSkills(formData.get("skillsToLearn")),
    notes: formData.get("notes"),
  };
}

function listToText(list) {
  return Array.isArray(list) ? list.join(", ") : "";
}

function getTeammatesNeeded(profile) {
  const value = Number.parseInt(profile.teammatesNeeded, 10);

  if (Number.isNaN(value)) {
    return 1;
  }

  return Math.max(0, value);
}

export function setupProfileForm(afterSave) {
  const form = getElement("#profile-form");
  const profileId = getElement("#profile-id");
  const title = getElement("#form-title");
  const cancelButton = getElement("#cancel-edit");

  function resetForm() {
    form.reset();
    profileId.value = "";
    form.elements.teammatesNeeded.value = "1";
    title.textContent = "Create a Skill Profile";
    cancelButton.hidden = true;
  }

  function editProfile(profile) {
    profileId.value = profile._id;
    form.elements.name.value = profile.name || "";
    form.elements.email.value = profile.email || "";
    form.elements.major.value = profile.major || "";
    form.elements.city.value = profile.city || "";
    form.elements.country.value = profile.country || "";
    form.elements.teammatesNeeded.value = getTeammatesNeeded(profile);
    form.elements.experienceLevel.value = profile.experienceLevel || "";
    form.elements.availability.value = profile.availability || "";
    form.elements.preferredRole.value = profile.preferredRole || "";
    form.elements.meetingPreference.value = profile.meetingPreference || "";
    form.elements.teammateStatus.value = profile.teammateStatus || "";
    form.elements.skillsToTeach.value = listToText(profile.skillsToTeach);
    form.elements.skillsToLearn.value = listToText(profile.skillsToLearn);
    form.elements.notes.value = profile.notes || "";

    title.textContent = `Edit ${profile.name}'s profile`;
    cancelButton.hidden = false;
    getElement("#profile-form-card").scrollIntoView({ behavior: "smooth" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await saveProfile(formToProfile(form), profileId.value);
      showMessage(profileId.value ? "Profile updated" : "Profile created");
      resetForm();
      await afterSave();
    } catch (error) {
      showMessage(error.message);
    }
  });

  cancelButton.addEventListener("click", resetForm);

  return { editProfile };
}
