import { getProfiles, removeProfile } from "./api.js";
import { escapeHtml, getElement, showMessage } from "./dom.js";

function chipList(items) {
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function profileCard(profile) {
  return `
    <article class="profile-card">
      <div class="profile-top">
        <div>
          <h3>${escapeHtml(profile.name)}</h3>
          <p>${escapeHtml(profile.major)} · ${escapeHtml(profile.email)}</p>
        </div>
        <strong>${escapeHtml(profile.teammateStatus)}</strong>
      </div>

      <dl class="quick-info">
        <div><dt>Experience</dt><dd>${escapeHtml(profile.experienceLevel)}</dd></div>
        <div><dt>Available</dt><dd>${escapeHtml(profile.availability)}</dd></div>
        <div><dt>Role</dt><dd>${escapeHtml(profile.preferredRole)}</dd></div>
        <div><dt>Meeting</dt><dd>${escapeHtml(profile.meetingPreference)}</dd></div>
      </dl>

      <p class="skill-label">Can teach</p>
      <div class="chips">${chipList(profile.skillsToTeach || [])}</div>

      <p class="skill-label">Wants to learn</p>
      <div class="chips">${chipList(profile.skillsToLearn || [])}</div>

      <p>${escapeHtml(profile.notes || "No extra note added.")}</p>

      <div class="card-actions">
        <a class="small-button" href="mailto:${encodeURIComponent(profile.email)}">Email</a>
        <button class="small-button" type="button" data-action="edit" data-id="${profile._id}">Edit</button>
        <button class="small-button danger" type="button" data-action="delete" data-id="${profile._id}">Delete</button>
      </div>
    </article>
  `;
}

function getFilterValues() {
  const data = new FormData(getElement("#filter-form"));
  return Object.fromEntries(data.entries());
}

export function setupProfileList(onEdit) {
  const list = getElement("#profiles-list");
  const count = getElement("#profile-count");
  const filterForm = getElement("#filter-form");

  let loadedProfiles = [];
  let currentPage = 1;
  const profilesPerPage = 10;

  function getVisibleProfiles() {
    const startIndex = (currentPage - 1) * profilesPerPage;
    const endIndex = startIndex + profilesPerPage;
    return loadedProfiles.slice(startIndex, endIndex);
  }

  function renderProfiles() {
    const totalPages = Math.ceil(loadedProfiles.length / profilesPerPage);
    const visibleProfiles = getVisibleProfiles();

    count.textContent = `${loadedProfiles.length} profile${
      loadedProfiles.length === 1 ? "" : "s"
    } total`;

    if (loadedProfiles.length === 0) {
      list.innerHTML = `<p class="empty">No matching profiles yet. Try different filters.</p>`;
      return;
    }

    list.innerHTML = `
      ${visibleProfiles.map(profileCard).join("")}

      <div class="pagination">
        <button
          id="previous-page"
          class="small-button"
          type="button"
          ${currentPage === 1 ? "disabled" : ""}
        >
          Previous 10
        </button>

        <span>Page ${currentPage} of ${totalPages}</span>

        <button
          id="next-page"
          class="small-button"
          type="button"
          ${currentPage === totalPages ? "disabled" : ""}
        >
          Next 10
        </button>
      </div>
    `;
  }

  async function loadProfiles(filters = getFilterValues()) {
    list.innerHTML = `<p class="loading">Loading profiles...</p>`;

    try {
      loadedProfiles = await getProfiles(filters);
      currentPage = 1;
      renderProfiles();
    } catch (error) {
      count.textContent = "Could not load profiles";
      list.innerHTML = `<p class="empty">${escapeHtml(error.message)}</p>`;
    }
  }

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadProfiles();
  });

  getElement("#clear-filters").addEventListener("click", () => {
    filterForm.reset();
    loadProfiles({});
  });

  getElement("#refresh-profiles").addEventListener("click", () => loadProfiles());

  list.addEventListener("click", async (event) => {
    const pageButton = event.target.closest("#previous-page, #next-page");

    if (pageButton) {
      if (pageButton.id === "previous-page") {
        currentPage -= 1;
      }

      if (pageButton.id === "next-page") {
        currentPage += 1;
      }

      renderProfiles();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const profile = loadedProfiles.find((item) => item._id === button.dataset.id);

    if (!profile) {
      showMessage("Please refresh and try again.");
      return;
    }

    if (button.dataset.action === "edit") {
      onEdit(profile);
      return;
    }

    if (!window.confirm(`Delete ${profile.name}'s profile?`)) {
      return;
    }

    try {
      await removeProfile(profile._id);
      showMessage("Profile deleted");
      await loadProfiles();
    } catch (error) {
      showMessage(error.message);
    }
  });

  return { loadProfiles };
}
