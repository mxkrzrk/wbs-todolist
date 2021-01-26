// Todos list
/* 
  {
    id: new Date().getTime(),
    task: '', 
    done: false,
  }
*/
let toDoList = [];

// Listen the submit button of input field
const submitForm = document.getElementById('taskInputForm');
submitForm.addEventListener('submit', createTodoHandle);

// Listen todos list
const todoListElement = document.getElementById('todoList');
todoListElement.onclick = (e) => {
  if (e.target.nodeName === 'P') editTodoHandle(e);
  if (e.target.parentNode.nodeName === 'BUTTON') deleteTodoHandle(e);
  if (e.target.parentNode.nodeName === 'DIV') markDoneTaskHandle(e);
};

// CRUD Operations
// Create a new todo
function createTodoHandle(e) {
  e.preventDefault();
  // Store the user input
  const userInputValue = document.getElementById('taskInput').value;
  // Guard for the user input
  if (!userInputValue) return;
  // Create todo
  const todo = {
    id: new Date().getTime(),
    task: userInputValue,
    done: false,
  };
  // Store the todo in the todos list
  toDoList.push(todo);
  // Display todo list
  displayTodoList();
}

// Display (Read) todos list
function displayTodoList() {
  const todoListElement = document.getElementById('todoList');
  // Clear the list previews
  todoListElement.innerHTML = '';
  toDoList.length > 0
    ? todoListElement.classList.add('todolist')
    : todoListElement.classList.remove('todolist');
  // Order the list based on done property
  toDoList.sort((prev, next) => {
    if (prev.done > next.done) return 1;
    if (prev.done < next.done) return -1;
  });
  // Create the li for each todo in the object
  toDoList.forEach((todo) => {
    const liElement = `
    <li id="${
      todo.id
    }" class="d-flex justify-content-between align-items-center">
      <div>${
        todo.done
          ? '<i class="fas fa-check-circle"></i>'
          : '<i class="fas fa-circle"></i>'
      }</div>
      ${
        todo.done
          ? `<p class="mb-0 w-100 mx-2 text-decoration-line-through">${todo.task}</p>`
          : `<p class="mb-0 w-100 mx-2">${todo.task}</p>`
      }
      <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
    </li>
    `;
    todoListElement.insertAdjacentHTML('beforeend', liElement);
  });
}

// Edit (Update) a todo
function editTodoHandle(e) {
  // Target the todo to update
  const todoEditableElement = e.target;
  // Turn on to edit the content
  todoEditableElement.setAttribute('contenteditable', 'true');
  // Listen when user press enter or blur the target
  todoEditableElement.addEventListener('blur', saveUpdateTodoHandle);
  todoEditableElement.onkeydown = (e) => {
    if (e.key === 'Enter') {
      // Avoid run two times the callback function
      todoEditableElement.removeEventListener('blur', saveUpdateTodoHandle);
      saveUpdateTodoHandle(e);
    }
  };
  // Update UI
  displayTodoList();
}

// Save (Update) the todo updated
function saveUpdateTodoHandle(e) {
  // Target the todo to update
  const todoEditableElement = e.target;
  // Turn off to edit the content
  todoEditableElement.removeAttribute('contenteditable', 'false');
  // Filter todo in the list of todos
  const todoFiltered = toDoList.filter(
    (todo) => todo.id === parseInt(e.target.parentNode.id)
  );
  // Store user input value updated
  todoFiltered[0].task = todoEditableElement.innerText;
}

// Delete todo
function deleteTodoHandle(e) {
  // Filter todo in the list of todos
  const todoFiltered = toDoList.filter(
    (todo) => todo.id !== parseInt(e.target.parentNode.parentNode.id)
  );
  // Update ToDo list
  toDoList = todoFiltered;
  // Update UI
  displayTodoList();
}

// Mark done the task
function markDoneTaskHandle(e) {
  // Retrieve task ID
  const todoDone = toDoList.map((todo) =>
    todo.id === parseInt(e.target.parentNode.parentNode.id)
      ? { ...todo, done: !todo.done }
      : { ...todo }
  );
  toDoList = todoDone;
  // Update UI
  displayTodoList();
}
