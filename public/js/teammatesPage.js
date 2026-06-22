import { setupProfileForm } from "./profileForm.js";
import { setupProfileList } from "./profileList.js";

const profileList = setupProfileList((profile) => {
  profileForm.editProfile(profile);
});

const profileForm = setupProfileForm(profileList.loadProfiles);

document.querySelector("#add-profile-link").addEventListener("click", () => {
  document.querySelector("#profile-form-card").scrollIntoView({ behavior: "smooth" });
});

profileList.loadProfiles();
