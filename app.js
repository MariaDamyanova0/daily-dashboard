const input = document.querySelector(".task-input input");
const addButton = document.querySelector(".task-input button");
const taskList = document.querySelector(".task-list");

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  input.value = "";
}
