console.log("hi");
const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");

let editTodo = null;
const addtodo = () => {
  const inputText = inputbox.value.trim();
  if (inputText.length <= 0) {
    alert("You must add a to-do to save");
  } else {
    if (addbtn.value === "Edit") {
      editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
      editTodo.target.previousElementSibling.innerHTML = inputText;
      addbtn.value = "Add";
      inputbox.value = "";
    } else {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = inputText;
      li.appendChild(p);

      const editbtn = document.createElement("button");
      editbtn.innerText = "Edit";
      editbtn.classList.add("btn", "editbtn");
      li.appendChild(editbtn);
      todolist.appendChild(li);

      const deletebtn = document.createElement("button");
      deletebtn.innerText = "Remove";
      deletebtn.classList.add("btn", "deletebtn");
      li.appendChild(deletebtn);

      inputbox.value = "";
      saveLocalTodos(inputText);
    }
  }
};
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todolist.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  } else if (e.target.innerHTML === "Edit") {
    inputbox.value = e.target.previousElementSibling.innerHTML;
    inputbox.focus();
    addbtn.value = "Edit";
    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};
const getLocalTodos = () => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const editbtn = document.createElement("button");
      editbtn.innerText = "Edit";
      editbtn.classList.add("btn", "editbtn");
      li.appendChild(editbtn);
      todolist.appendChild(li);

      const deletebtn = document.createElement("button");
      deletebtn.innerText = "Remove";
      deletebtn.classList.add("btn", "deletebtn");
      li.appendChild(deletebtn);

      inputbox.value = "";
    });
  }
};

const deleteLocalTodos = (todo) => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todotext = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todotext);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};
const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoindex = todos.indexOf(todo);
  todos[todoindex] = inputbox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};
document.addEventListener("DOMContentLoaded", getLocalTodos);
addbtn.addEventListener("click", addtodo);
todolist.addEventListener("click", updateTodo);
