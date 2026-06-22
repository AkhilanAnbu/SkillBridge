import { getProfiles, saveProfile } from "./api.js";
import { escapeHtml, getElement, showMessage } from "./dom.js";

function chipList(items) {
  if (!items || items.length === 0) {
    return `<span class="chip-empty">None added</span>`;
  }

  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function valueOrMissing(value) {
  return value ? escapeHtml(value) : "Not added";
}

function getTeammatesNeeded(profile) {
  const value = Number.parseInt(profile.teammatesNeeded, 10);

  if (Number.isNaN(value)) {
    return 1;
  }

  return Math.max(0, value);
}

function isTeamFilled(profile) {
  return getTeammatesNeeded(profile) === 0;
}

function teamStatusText(profile) {
  if (isTeamFilled(profile)) {
    return "Found teammate needed";
  }

  const needed = getTeammatesNeeded(profile);
  return `${needed} teammate${needed === 1 ? "" : "s"} still needed`;
}

function setupOwnerCodeModal() {
  const modal = getElement("#owner-code-modal");
  const form = getElement("#owner-code-form");
  const description = getElement("#owner-code-description");
  const input = getElement("#owner-code-action-input");
  const cancelButton = getElement("#cancel-owner-code");
  const toggleButton = getElement("#toggle-action-owner-code");

  let resolveOwnerCode = null;

  function closeModal(value) {
    modal.hidden = true;
    input.value = "";
    input.type = "password";
    toggleButton.textContent = "Show";

    if (resolveOwnerCode) {
      resolveOwnerCode(value);
      resolveOwnerCode = null;
    }
  }

  toggleButton.addEventListener("click", () => {
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    toggleButton.textContent = isHidden ? "Hide" : "Show";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal(input.value.trim());
  });

  cancelButton.addEventListener("click", () => {
    closeModal("");
  });

  return function requestOwnerCode(actionName) {
    description.textContent = `Enter the profile owner code to ${actionName}.`;
    modal.hidden = false;
    input.focus();

    return new Promise((resolve) => {
      resolveOwnerCode = resolve;
    });
  };
}

async function verifyOwnerCode(profileId, ownerCode) {
  const response = await fetch(`/api/skill-profiles/${profileId}/verify-owner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ownerCode }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Incorrect profile owner code.");
  }

  return data;
}

async function deleteProfile(profileId, ownerCode) {
  const response = await fetch(`/api/skill-profiles/${profileId}`, {
    method: "DELETE",
    headers: {
      "x-owner-code": ownerCode,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Could not delete profile.");
  }
}

function defaultApplyMessage(profile) {
  return `Hi ${profile.name},

I found your SkillBridge profile and I am interested in applying to be your teammate.

A little about me:
- My name:
- Skills I can contribute:
- Skills I want to learn:
- My availability:
- Project or class I am working on:

I think we could be a good match because your profile mentions:
- Role: ${profile.preferredRole || "Not added"}
- Availability: ${profile.availability || "Not added"}
- Skills you can teach: ${(profile.skillsToTeach || []).join(", ") || "Not added"}
- Teammates still needed: ${getTeammatesNeeded(profile)}

Please let me know if you are still looking for a teammate.

Thank you,
Your Name`;
}

function openApplyForm(profile) {
  if (isTeamFilled(profile)) {
    showMessage("This profile already found the teammate needed.");
    return;
  }

  const applyCard = getElement("#apply-card");
  const applyTarget = getElement("#apply-target");
  const applyEmail = getElement("#apply-profile-email");
  const applyName = getElement("#apply-profile-name");
  const subject = getElement("#apply-subject");
  const message = getElement("#apply-message");

  applyTarget.textContent = `Applying to ${profile.name} at ${profile.email}`;
  applyEmail.value = profile.email || "";
  applyName.value = profile.name || "";
  subject.value = `SkillBridge teammate application for ${profile.name}`;
  message.value = defaultApplyMessage(profile);

  applyCard.hidden = false;
  applyCard.scrollIntoView({ behavior: "smooth" });
}

function setupApplyForm() {
  const applyCard = getElement("#apply-card");
  const applyForm = getElement("#apply-form");
  const cancelApply = getElement("#cancel-apply");

  applyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(applyForm);
    const profileEmail = formData.get("profileEmail");
    const applicantName = formData.get("applicantName");
    const applicantEmail = formData.get("applicantEmail");
    const subject = formData.get("applySubject");
    let body = formData.get("applyMessage");

    if (applicantName || applicantEmail) {
      body += `\n\nApplicant details:\n`;
    }

    if (applicantName) {
      body += `Name: ${applicantName}\n`;
    }

    if (applicantEmail) {
      body += `Email: ${applicantEmail}\n`;
    }

    const mailtoLink = `mailto:${encodeURIComponent(profileEmail)}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    showMessage("Email draft opened. You can edit and send it from your email app.");
  });

  cancelApply.addEventListener("click", () => {
    applyForm.reset();
    applyCard.hidden = true;
  });
}

function profileCard(profile) {
  const filled = isTeamFilled(profile);
  const needed = getTeammatesNeeded(profile);

  return `
    <article class="profile-card ${filled ? "profile-filled" : ""}">
      <div class="profile-top">
        <div>
          <h3>${escapeHtml(profile.name)}</h3>
          <p>
            ${escapeHtml(profile.major)}
            · ${valueOrMissing(profile.city)}
            · ${valueOrMissing(profile.country)}
          </p>
        </div>
        <strong class="${filled ? "status-filled" : ""}">
          ${escapeHtml(filled ? "Found teammate needed" : profile.teammateStatus)}
        </strong>
      </div>

      <p class="${filled ? "team-filled-note" : "need-count"}">
        ${escapeHtml(teamStatusText(profile))}
      </p>

      <dl class="quick-info">
        <div><dt>Experience</dt><dd>${escapeHtml(profile.experienceLevel)}</dd></div>
        <div><dt>Available</dt><dd>${escapeHtml(profile.availability)}</dd></div>
        <div><dt>Role</dt><dd>${escapeHtml(profile.preferredRole)}</dd></div>
        <div><dt>Meeting</dt><dd>${escapeHtml(profile.meetingPreference)}</dd></div>
        <div><dt>City</dt><dd>${valueOrMissing(profile.city)}</dd></div>
        <div><dt>Country / county</dt><dd>${valueOrMissing(profile.country)}</dd></div>
        <div><dt>Teammates needed</dt><dd>${needed}</dd></div>
      </dl>

      <p class="skill-label">Can teach</p>
      <div class="chips">${chipList(profile.skillsToTeach || [])}</div>

      <p class="skill-label">Wants to learn</p>
      <div class="chips">${chipList(profile.skillsToLearn || [])}</div>

      <p>${escapeHtml(profile.notes || "No extra note added.")}</p>

      <div class="card-actions">
        <button
          class="small-button"
          type="button"
          data-action="apply"
          data-id="${escapeHtml(profile._id)}"
          ${filled ? "disabled" : ""}
        >
          ${filled ? "Filled" : "Apply"}
        </button>

        <button
          class="small-button secondary"
          type="button"
          data-action="accept"
          data-id="${escapeHtml(profile._id)}"
          ${filled ? "disabled" : ""}
        >
          Mark teammate accepted
        </button>

        <button
          class="small-button secondary"
          type="button"
          data-action="edit"
          data-id="${escapeHtml(profile._id)}"
        >
          Edit
        </button>

        <button
          class="small-button danger"
          type="button"
          data-action="delete"
          data-id="${escapeHtml(profile._id)}"
        >
          Delete
        </button>
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
  const requestOwnerCode = setupOwnerCodeModal();

  let loadedProfiles = [];
  let currentPage = 1;
  const profilesPerPage = 5;

  setupApplyForm();

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
          Previous 5
        </button>

        <span>Page ${currentPage} of ${totalPages}</span>

        <button
          id="next-page"
          class="small-button"
          type="button"
          ${currentPage === totalPages ? "disabled" : ""}
        >
          Next 5
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

  async function markAccepted(profile) {
    const ownerCode = await requestOwnerCode("mark a teammate as accepted");

    if (!ownerCode) {
      showMessage("Owner code is required for this action.");
      return;
    }

    try {
      await verifyOwnerCode(profile._id, ownerCode);
    } catch (error) {
      showMessage(error.message);
      return;
    }

    const currentNeeded = getTeammatesNeeded(profile);
    const nextNeeded = Math.max(0, currentNeeded - 1);

    if (!window.confirm(`Mark one teammate as accepted for ${profile.name}?`)) {
      return;
    }

    try {
      await saveProfile(
        {
          ...profile,
          currentOwnerCode: ownerCode,
          ownerCode,
          teammatesNeeded: nextNeeded,
        },
        profile._id,
      );

      showMessage(
        nextNeeded === 0
          ? "Profile updated: teammate need is now filled."
          : `Profile updated: ${nextNeeded} teammate(s) still needed.`,
      );

      await loadProfiles();
    } catch (error) {
      showMessage(error.message);
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

    if (button.dataset.action === "apply") {
      openApplyForm(profile);
      return;
    }

    if (button.dataset.action === "accept") {
      await markAccepted(profile);
      return;
    }

    if (button.dataset.action === "edit") {
      const ownerCode = await requestOwnerCode("edit this profile");

      if (!ownerCode) {
        showMessage("Owner code is required for this action.");
        return;
      }

      try {
        const verifiedProfile = await verifyOwnerCode(profile._id, ownerCode);
        onEdit({
          ...verifiedProfile,
          currentOwnerCode: ownerCode,
          ownerCode,
        });
        showMessage("Edit mode opened. Update the form and click Save profile.");
      } catch (error) {
        showMessage(error.message);
      }

      return;
    }

    if (button.dataset.action === "delete") {
      const ownerCode = await requestOwnerCode("delete this profile");

      if (!ownerCode) {
        showMessage("Owner code is required for this action.");
        return;
      }

      if (!window.confirm(`Delete ${profile.name}'s profile?`)) {
        return;
      }

      try {
        await deleteProfile(profile._id, ownerCode);
        showMessage("Profile deleted");
        await loadProfiles();
      } catch (error) {
        showMessage(error.message);
      }
    }
  });

  return { loadProfiles };
}
