const projectsGrid = document.getElementById("projectsGrid");
const filtersEl = document.getElementById("filters");
const yearEl = document.getElementById("year");

let activeCategory = "All";

function getCategories(projects) {
    const unique = [...new Set(projects.map(project => project.category))];
    return ["All", ...unique];
}

function createFilterButtons(categories) {
    filtersEl.innerHTML = "";

    categories.forEach(category => {
        const button = document.createElement("button");
        button.className = `filter-chip${category === activeCategory ? " active" : ""}`;
        button.textContent = category;
        button.type = "button";

        button.addEventListener("click", () => {
            activeCategory = category;
            createFilterButtons(categories);
            renderProjects();
        });

        filtersEl.appendChild(button);
    });
}

function renderProjects() {
    const filteredProjects = activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter(project => project.category === activeCategory);

    projectsGrid.innerHTML = "";

    if (!filteredProjects.length) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = "No projects found for this category.";
        projectsGrid.appendChild(empty);
        return;
    }

    filteredProjects.forEach(project => {
        const article = document.createElement("article");
        article.className = "project-card";

        const tagsHtml = project.tags
            .map(tag => `<span class="project-tag">${tag}</span>`)
            .join("");

        article.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title} preview image" loading="lazy" />
      </div>
      <div class="project-body">
        <p class="project-category">${project.category}</p>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        <div class="project-meta">${tagsHtml}</div>
        <div class="project-links">
          <a class="button primary" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>
          <a class="button" href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </div>
    `;

        projectsGrid.appendChild(article);
    });
}

function init() {
    yearEl.textContent = new Date().getFullYear();
    const categories = getCategories(PROJECTS);
    createFilterButtons(categories);
    renderProjects();
}

init();