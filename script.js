console.log("hi")
const inputbox = document.getElementById('inputbox')
const addbtn = document.getElementById('addbtn')
const todolist = document.getElementById('todolist')

let editTodo = null;
const addtodo = ()=>{
    const inputText = inputbox.value.trim()
    if(inputText.length <= 0 ){
        alert("You must add a to-do to save")
    }
    else{
        if(addbtn.value === 'Edit'){
            editTodo.target.previousElementSibling.innerHTML = inputText;
            addbtn.value = "Add"
            inputbox.value = ''
        }
        else{
            const li = document.createElement('li')
            const p = document.createElement('p')
            p.innerHTML = inputText;
            li.appendChild(p)
    
            const editbtn = document.createElement('button')
            editbtn.innerText = "Edit"
            editbtn.classList.add('btn','editbtn')
            li.appendChild(editbtn)
            todolist.appendChild(li)
    
            const deletebtn = document.createElement('button')
            deletebtn.innerText = "Remove"
            deletebtn.classList.add('btn','deletebtn')
            li.appendChild(deletebtn)
    
    
            inputbox.value = ''
        }

    }
}
const updateTodo =(e)=>{
    if(e.target.innerHTML === 'Remove'){
        todolist.removeChild( e.target.parentElement)
    }
    else if(e.target.innerHTML === 'Edit'){
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus()
        addbtn.value = "Edit"
        editTodo = e;
    }
}
addbtn.addEventListener('click',addtodo)
todolist.addEventListener('click',updateTodo)
