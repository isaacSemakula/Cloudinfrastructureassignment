const backendBase = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : `http://${window.location.hostname}:5000`;

const apiUrl = `${backendBase}/projects`;

async function fetchProjects() {
  const res = await fetch(apiUrl);
  const projects = await res.json();

  const list = document.getElementById('projectList');
  list.innerHTML = '';

  projects.forEach(project => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${project.name}</strong><br>
      Owner: ${project.owner}<br>
      Status: ${project.status}<br>
      Deadline: ${project.deadline}<br>
      <button class="delete-btn" onclick="deleteProject('${project._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById('projectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const project = {
    name: document.getElementById('name').value,
    owner: document.getElementById('owner').value,
    status: document.getElementById('status').value,
    deadline: document.getElementById('deadline').value
  };

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });

  e.target.reset();
  fetchProjects();
});

async function deleteProject(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchProjects();
}

fetchProjects();
