// Обработчики событий
document.getElementById("add-task-button").addEventListener("click", addTask);
document
  .getElementById("new-task-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

// Загрузка задач из localStorage
window.onload = loadTasks;

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task.text, task.completed));
}

function addTask() {
  const taskInput = document.getElementById("new-task-input");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    renderTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
}

function renderTask(text, completed = false) {
  const taskList = document.getElementById("task-list");
  const li = document.createElement("li");
  li.textContent = text;
  li.className = completed ? "completed" : "";
  li.addEventListener("click", toggleTaskCompletion);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", deleteTask);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function toggleTaskCompletion(e) {
  const li = e.currentTarget;
  li.classList.toggle("completed");
  updateLocalStorage();
}

function deleteTask(e) {
  const li = e.currentTarget.parentElement;
  li.remove();
  updateLocalStorage();
}

function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
