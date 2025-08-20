const todoInput = document.getElementById("todoInput")
const addBtn = document.getElementById("addBtn")
const todoList = document.getElementById("todoList")

let todos = []


function loadTodos() {
    const data = localStorage.getItem("todos")
    todos = data ? JSON.parse(data) : []
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

function renderTodos() {
    todoList.innerHTML = ""
    todos.forEach((todo, idx) => {
        const li = document.createElement("li")
        li.className = todo.completed ? "completed" : ""

        const checkBtn = document.createElement("button")
        checkBtn.className = "checkBtn"
        checkBtn.innerHTML = todo.completed ? "✔️" : "⭕"
        checkBtn.title = todo.completed ? "Mark as incomplete" : "Mark as complete"

        checkBtn.onclick = () => toggleComplete(idx);
        li.appendChild(checkBtn);

        const span = document.createElement("span");
		span.textContent = todo.text;
		li.appendChild(span);

        const deleteBtn = document.createElement("button");
		deleteBtn.className = "deleteBtn";
		deleteBtn.innerHTML ="🗑️";
		deleteBtn.title = "Delete task";
		deleteBtn.onclick = () => removeTodo(idx, li);
		li.appendChild(deleteBtn);

		todoList.appendChild(li);

    })
}


function addTodo() {
	const text = todoInput.value.trim();
	if (!text) return;
	todos.unshift({ text, completed: false });
	saveTodos();
	renderTodos();
	todoInput.value = "";
	todoInput.focus();
}

function removeTodo(idx, li) {
	li.classList.add("removing");
	setTimeout(() => {
		todos.splice(idx, 1);
		saveTodos();
		renderTodos();
	}, 300);
}

function toggleComplete(idx) {
	todos[idx].completed = !todos[idx].completed;
	saveTodos();
	renderTodos();
}

addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", e => {
	if (e.key === 'Enter') addTodo();
});

loadTodos();
renderTodos();
