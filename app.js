// Todo object
/* 
  {
    id: new Date().getTime(),
    task: '', 
    done: false,
  }
*/

class ToDoList {
  constructor(submitForm, userInput, todoList, todoListNotDone, todoListDone) {
    this._toDoList = [];
    this._submitForm = document.getElementById(submitForm);
    this._userInput = document.getElementById(userInput);
    this._todoListElement = document.getElementById(todoList);
    this._todoListNotDone = document.getElementById(todoListNotDone);
    this._todoListDone = document.getElementById(todoListDone);
    this.init();
  }

  init = () => {
    // Listen the submit button of input field
    this._submitForm.addEventListener('submit', this.createTodoHandle);
    // Listen todo list
    this._todoListElement.addEventListener('click', (e) => {
      if (e.target.nodeName === 'P') this.editTodoHandle(e);
      if (e.target.parentNode.nodeName === 'BUTTON') this.deleteTodoHandle(e);
      if (e.target.parentNode.nodeName === 'DIV') this.markDoneTaskHandle(e);
    });
  };

  // Create a new todo
  createTodoHandle = (e) => {
    e.preventDefault();
    // Store the user input
    const userInputValue = this._userInput.value;
    // Guard for the user input
    if (!userInputValue) return;
    // Create todo
    const todo = {
      id: new Date().getTime(),
      task: userInputValue,
      done: false,
    };
    // Store the todo in the todos list
    this._toDoList.push(todo);
    // Clean the form
    document.forms[0].reset();
    // Display todo list
    this.displayTodoList();
  };

  // Display (Read) todo list
  displayTodoList = () => {
    // Clear the previous lists
    this._todoListNotDone.innerHTML = '';
    this._todoListDone.innerHTML = '';
    this._toDoList.length > 0
      ? this._todoListElement.classList.add('todolist')
      : this._todoListElement.classList.remove('todolist');
    // Create the li for each todo in the object
    this._toDoList.forEach((todo) => {
      let liElement;
      if (todo.done) {
        // Template for todo done
        liElement = `
      <li id="${todo.id}" class="d-flex justify-content-between align-items-center">
        <div><i class="fas fa-check-circle"></i></div>
        <p class="mb-0 w-100 mx-2 text-decoration-line-through">${todo.task}</p>
        <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
      </li>
      `;
        this._todoListDone.insertAdjacentHTML('beforeend', liElement);
        // Create the title if it is the first todo done
        if (this._todoListDone.children.length === 1) {
          const titleElement =
            '<div class="todolist-title d-flex justify-content-start align-items-center"><i class="fas fa-tasks"></i><h3>Completed</h3></div>';
          this._todoListDone.insertAdjacentHTML('afterbegin', titleElement);
        }
      } else {
        // Template for todo not done
        liElement = `
      <li id="${todo.id}" class="d-flex justify-content-between align-items-center">
        <div><i class="far fa-circle"></i></div>
        <p class="mb-0 w-100 mx-2">${todo.task}</p>
        <button class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
      </li>
      `;
        this._todoListNotDone.insertAdjacentHTML('beforeend', liElement);
      }
    });
  };

  // Edit (Update) a todo
  editTodoHandle = (e) => {
    // Target the todo to update
    const todoEditableElement = e.target;
    // Turn on to edit the content
    todoEditableElement.setAttribute('contenteditable', 'true');
    // Listen when user press enter or blur the target
    todoEditableElement.addEventListener('blur', this.saveUpdateTodoHandle);
    todoEditableElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // Avoid run two times the callback function
        todoEditableElement.removeEventListener(
          'blur',
          this.saveUpdateTodoHandle
        );
        this.saveUpdateTodoHandle(e);
      }
    });
  };

  // Save (Update) the todo updated
  saveUpdateTodoHandle = (e) => {
    // Target the todo to update
    const todoEditableElement = e.target;
    // Turn off to edit the content
    todoEditableElement.removeAttribute('contenteditable', 'false');
    // Store user input value updated
    const toDoListUpdated = this._toDoList.map(
      (todo) => 
        todo.id === parseInt(e.target.parentNode.id) 
          ? {...todo, task: todoEditableElement.innerText}
          : {...todo }
    );
    this._toDoList = toDoListUpdated;
  };

  // Delete todo
  deleteTodoHandle = (e) => {
    // Filter todo in the todo list
    const todoFiltered = this._toDoList.filter(
      (todo) => todo.id !== parseInt(e.target.parentNode.parentNode.id)
    );
    // Update todo list
    this._toDoList = todoFiltered;
    // Update UI
    this.displayTodoList();
  };

  // Mark done the task
  markDoneTaskHandle = (e) => {
    // Retrieve todo ID
    const todoDone = this._toDoList.map((todo) =>
      todo.id === parseInt(e.target.parentNode.parentNode.id)
        ? { ...todo, done: !todo.done }
        : { ...todo }
    );
    // Update todo list
    this._toDoList = todoDone;
    // Update UI
    this.displayTodoList();
  };
}

new ToDoList(
  'taskInputForm',
  'taskInput',
  'todoList',
  'todoListNotDone',
  'todoListDone'
);
