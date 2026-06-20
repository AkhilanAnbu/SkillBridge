import { getElement } from "./dom.js";
import { setupProfileForm } from "./profileForm.js";
import { setupProfileList } from "./profileList.js";

const profileList = setupProfileList((profile) => profileForm.editProfile(profile));
const profileForm = setupProfileForm(() => profileList.loadProfiles());

getElement("#add-profile-link").addEventListener("click", () => {
  getElement("#profile-form-card").scrollIntoView({ behavior: "smooth" });
});

profileList.loadProfiles();
