let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const tbody = document.getElementById("taskTable");
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    const taskCell = document.createElement("td");
    taskCell.textContent = task.text;
    if (task.completed) taskCell.classList.add("completed");

    const statusCell = document.createElement("td");
    statusCell.innerHTML = task.completed
      ? "<span class='text-success fw-bold'>Done</span>"
      : "<span class='text-warning'>Pending</span>";

    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
          <button class="btn btn-sm btn-outline-success me-2" onclick="toggleComplete(${index}, this)">
            ${task.completed ? "Undo" : "Done"}
          </button>
          <button class="btn btn-sm btn-outline-secondary me-2" onclick="editTask(${index}, this)">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${index})">Delete</button>
        `;

    row.appendChild(taskCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

function toggleComplete(index, button) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index, button) {
  const row = button.closest("tr");
  const taskCell = row.children[0];

  if (button.textContent === "Edit") {
    const currentText = taskCell.textContent;
    taskCell.innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentText}">`;
    button.textContent = "Save";
  } else {
    const newText = taskCell.querySelector("input").value.trim();
    if (newText) {
      tasks[index].text = newText;
      saveTasks();
      renderTasks();
    }
  }
}

function showTodayDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  document.getElementById("todayDate").textContent = date.toLocaleDateString(
    "en-US",
    options
  );
}

// Initialize
showTodayDate();
renderTasks();
