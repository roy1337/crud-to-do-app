const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

//check LocalStorage - if any past todos exist
const todos = JSON.parse(localStorage.getItem('todosArray'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

//submit listener - new todo
form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

   if(todo) {
     todoText = todo.text
   }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todosUL.appendChild(todoEl)
        input.value = ''

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS()
        })

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })   
        
    }
    updateLS()
}

function updateLS() {
    todosEl = document.querySelectorAll('li') // Selecting all list items

    const todosArray = []
    //looping through the List items and putting inside the array

    todosEl.forEach(todoEl => {
        todosArray.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todosArray', JSON.stringify(todosArray))
}

