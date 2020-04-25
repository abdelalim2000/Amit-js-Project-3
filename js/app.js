//selectors
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
/* var dataBase = []; */

//event listeners
document.addEventListener("DOMContentLoaded", () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //adding todo to the container
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    //Delete button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
  });
});
todoButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

todoButton.addEventListener("keyup", (e) => {
  if (e == 13) {
    e.preventDefault();
    addTodo();
  }
});

todoList.addEventListener("click", (e) => {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeTodosLocalStorage(todo);
    /* todo.classList.add("fall"); */
    todo.remove();
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
});
//functions

//add todo
var addTodo = () => {
  //create container for todo
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //adding todo to the container
  const newTodo = document.createElement("li");
  if (todoInput.value == "") {
    return alert("Fill The Input");
  } else {
    newTodo.innerText = todoInput.value;
    dataBase(todoInput.value);
    todoInput.value = "";
  }
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //check mark
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeButton);

  //Delete button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);
};

//save todos
var dataBase = (todo) => {
  let todos;
  //check if storage empty
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

//remove todos from database
var removeTodosLocalStorage = (todo) => {
  let todos;
  //check if storage empty
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

//set real time clock
var clock = () => {
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("min");
  const seconds = document.getElementById("sec");

  var h = new Date().getHours();
  var m = new Date().getMinutes();
  var s = new Date().getSeconds();
  if (h > 12) {
    h -= 12;
  }

  if (h == 0) {
    h = 12;
  }

  hours.innerHTML = h < 10 ? `0${h}` : h;
  minutes.innerHTML = m < 10 ? `0${m}` : m;
  seconds.innerHTML = s < 10 ? `0${s}` : s;
};

setInterval(clock, 500);
