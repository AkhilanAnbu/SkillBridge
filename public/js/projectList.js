import { getProjects, removeProject } from "./projectApi.js";
import { escapeHtml, getElement, showMessage } from "./dom.js";

function chipList(items) {
  if (!items || items.length === 0) {
    return `<span class="chip-empty">None listed</span>`;
  }
  return items.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
}

function statusClass(status) {
  return (
    "status-" +
    String(status || "")
      .toLowerCase()
      .replaceAll(" ", "-")
  );
}

function projectCard(project) {
  return `
    <article class="project-card">
      <div class="project-top">
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.category)} · ${escapeHtml(project.creatorName)}</p>
        </div>
        <strong class="${statusClass(project.status)}">${escapeHtml(project.status)}</strong>
      </div>

      <p class="project-desc">${escapeHtml(project.description)}</p>

      <dl class="quick-info">
        <div><dt>Schedule</dt><dd>${escapeHtml(project.schedule || "Flexible")}</dd></div>
        <div><dt>Open positions</dt><dd>${escapeHtml(project.openPositions || "—")}</dd></div>
      </dl>

      <p class="skill-label">Skills needed</p>
      <div class="chips">${chipList(project.requiredSkills)}</div>

      <p class="skill-label">You can learn</p>
      <div class="chips">${chipList(project.learningOpportunities)}</div>

      <p class="skill-label">Open roles</p>
      <div class="chips">${chipList(project.availableRoles)}</div>

      <div class="card-actions">
        <a class="small-button" href="mailto:${encodeURIComponent(project.creatorEmail)}">Email</a>
        <button class="small-button" type="button" data-action="edit" data-id="${project._id}">Edit</button>
        <button class="small-button danger" type="button" data-action="delete" data-id="${project._id}">Delete</button>
      </div>
    </article>
  `;
}

function getFilterValues() {
  const data = new FormData(getElement("#filter-form"));
  return Object.fromEntries(data.entries());
}

export function setupProjectList(onEdit) {
  const list = getElement("#projects-list");
  const count = getElement("#project-count");
  const filterForm = getElement("#filter-form");

  let loadedProjects = [];
  let currentPage = 1;
  const projectsPerPage = 10;

  function getVisibleProjects() {
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    return loadedProjects.slice(startIndex, endIndex);
  }

  function renderProjects() {
    const totalPages = Math.ceil(loadedProjects.length / projectsPerPage);
    const visibleProjects = getVisibleProjects();

    count.textContent = `${loadedProjects.length} project${
      loadedProjects.length === 1 ? "" : "s"
    } total`;

    if (loadedProjects.length === 0) {
      list.innerHTML = `<p class="empty">No matching projects yet. Try different filters or create one.</p>`;
      return;
    }

    list.innerHTML = `
      ${visibleProjects.map(projectCard).join("")}

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

  async function loadProjects(filters = getFilterValues()) {
    list.innerHTML = `<p class="loading">Loading projects...</p>`;

    try {
      loadedProjects = await getProjects(filters);
      currentPage = 1;
      renderProjects();
    } catch (error) {
      count.textContent = "Could not load projects";
      list.innerHTML = `<p class="empty">${escapeHtml(error.message)}</p>`;
    }
  }

  filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadProjects();
  });

  getElement("#clear-filters").addEventListener("click", () => {
    filterForm.reset();
    loadProjects({});
  });

  getElement("#refresh-projects").addEventListener("click", () => loadProjects());

  list.addEventListener("click", async (event) => {
    const pageButton = event.target.closest("#previous-page, #next-page");

    if (pageButton) {
      if (pageButton.id === "previous-page") {
        currentPage -= 1;
      }

      if (pageButton.id === "next-page") {
        currentPage += 1;
      }

      renderProjects();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const button = event.target.closest("button[data-action]");

    if (!button) {
      return;
    }

    const project = loadedProjects.find((item) => item._id === button.dataset.id);

    if (!project) {
      showMessage("Please refresh and try again.");
      return;
    }

    if (button.dataset.action === "edit") {
      onEdit(project);
      return;
    }

    if (!window.confirm(`Delete the project "${project.title}"?`)) {
      return;
    }

    try {
      await removeProject(project._id);
      showMessage("Project deleted");
      await loadProjects();
    } catch (error) {
      showMessage(error.message);
    }
  });

  return { loadProjects };
}
