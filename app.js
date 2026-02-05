const input = document.querySelector(".task-input input");
const addButton = document.querySelector(".task-input button");
const taskList = document.querySelector(".task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const counterEl = document.querySelector(".counter");

let currentFilter = "all";
let tasks = loadTasks(); // [{ id, text, done }]

addButton.addEventListener("click", handleAdd);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleAdd();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    renderTasks();
  });
});

// Initial render
renderTasks();

/* -------------------- Core actions -------------------- */

function handleAdd() {
  const text = input.value.trim();
  if (text === "") return;

  const newTask = {
    id: Date.now(),
    text,
    done: false,
  };

  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();

  input.value = "";
}

function handleToggle(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(tasks);
  renderTasks();
}

function handleDelete(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  renderTasks();
}

/* -------------------- Rendering -------------------- */

function renderTasks() {
  taskList.innerHTML = "";

  // counter
  const leftCount = tasks.filter((t) => !t.done).length;
  counterEl.textContent = `${leftCount} left`;

  // filter
  let visibleTasks = tasks;

  if (currentFilter === "active") {
    visibleTasks = tasks.filter((t) => !t.done);
  } else if (currentFilter === "done") {
    visibleTasks = tasks.filter((t) => t.done);
  }

  for (const task of visibleTasks) {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    // left side: checkbox + text
    const left = document.createElement("div");
    left.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => handleToggle(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => handleDelete(task.id));

    li.appendChild(left);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

/* -------------------- Storage -------------------- */

function saveTasks(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function loadTasks() {
  const raw = localStorage.getItem("tasks");
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
