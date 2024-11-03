const inputbox = document.getElementById("inputbox");
const addbtn = document.getElementById("addbtn");
const todolist = document.getElementById("todolist");

let editTodo = null;

const addtodo = () => {
  const inputText = inputbox.value.trim();//used trim to remove extra spaces
  if (inputText.length <= 0) {
    alert("You must add a to-do to save");
    return;
  }

  if (addbtn.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    addbtn.value = "Add";
    inputbox.value = "";
  } else {
    const todo = { text: inputText, completed: false }; 
    const li = createTodoElement(todo);
    todolist.appendChild(li);
    inputbox.value = "";
    saveLocalTodos(todo); 
  }
};

const createTodoElement = (todo) => {
  const li = document.createElement("li");
  // Create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = todo.completed; 
  checkbox.addEventListener('click', () => {
    todo.completed = checkbox.checked; 
    updateLocalTodoStatus(todo); 
    li.classList.toggle('checked', todo.completed); 
  });

  li.appendChild(checkbox);

  const p = document.createElement("p");
  p.innerHTML = todo.text;
  li.appendChild(p);

  //Added a edit button to the list
  const editbtn = document.createElement("button");
  editbtn.innerText = "Edit";
  editbtn.classList.add("btn", "editbtn");
  editbtn.addEventListener('click', () => {
    inputbox.value = todo.text;
    inputbox.focus();
    addbtn.value = "Edit";
    editTodo = { target: { previousElementSibling: p } }; // Store for edit
  });
  li.appendChild(editbtn);

  //Added a delete button to the list with inner text "Remove"
  const deletebtn = document.createElement("button");
  deletebtn.innerText = "Remove";
  deletebtn.classList.add("btn", "deletebtn");
  deletebtn.addEventListener('click', () => {
    todolist.removeChild(li);
    deleteLocalTodos(todo);
  });
  li.appendChild(deletebtn);

  
  li.classList.toggle('checked', todo.completed); 

  return li;
};

const saveLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const li = createTodoElement(todo);
    todolist.appendChild(li);
  });
};

const deleteLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.filter((t) => t.text !== todo.text); // Remove the deleted todo
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (oldText) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    if (todo.text === oldText) {
      todo.text = inputbox.value; // Update the text
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateLocalTodoStatus = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((t) => {
    if (t.text === todo.text) {
      t.completed = todo.completed; 
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", getLocalTodos);

//Give a click handler function to the click event on add button
addbtn.addEventListener("click", addtodo);
