const apiUrl = "/api/project-collaborations";

async function readJson(response) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export async function getProjects(filters) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      params.set(key, value);
    }
  }

  const queryString = params.toString();
  const response = await fetch(queryString ? `${apiUrl}?${queryString}` : apiUrl);
  return readJson(response);
}

export async function saveProject(project, id) {
  const response = await fetch(id ? `${apiUrl}/${id}` : apiUrl, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });

  return readJson(response);
}

export async function removeProject(id) {
  const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  return readJson(response);
}
