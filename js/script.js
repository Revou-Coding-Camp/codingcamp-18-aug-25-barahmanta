const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterDate = document.getElementById("filter-date");
const clearFilter = document.getElementById("clear-filter");

let todos = [];

function renderTodos(list) {
  todoList.innerHTML = "";

  if (list.length === 0) {
    todoList.innerHTML = `<li class="text-center text-gray-500">No activity.</li>`;
    return;
  }

  list.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center border border-pink-400 bg-green-50 p-3 rounded-lg";

    const text = document.createElement("span");
    text.className = "text-gray-700 font-medium";
    text.textContent = `${todo.task} - ${todo.date}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "bg-pink-400 text-white px-3 py-1 rounded-lg transition hover:bg-red-500";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(text);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill in both task and date.");
    return;
  }

  todos.push({ task, date });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos(todos);
});

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos(todos);
}

filterDate.addEventListener("input", () => {
  const filterValue = filterDate.value;
  if (filterValue) {
    const filtered = todos.filter(todo => todo.date === filterValue);
    renderTodos(filtered);
  } else {
    renderTodos(todos);
  }
});

clearFilter.addEventListener("click", () => {
  filterDate.value = "";
  renderTodos(todos);
});

renderTodos(todos);