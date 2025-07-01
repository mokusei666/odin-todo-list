import { app } from "./app";
import { createElement } from "./utility"
import { events } from "./events";
import plusImage from "./images/plus-solid.svg";
import xmarkImage from "./images/xmark-solid.svg";
import penImage from "./images/pen-solid.svg";
import checkImageFalse from "./images/minus-solid.svg";

const render = (() => {
  const todoList = app.todoList;
  const renderSidebar = () => {
    const sidebarUl = document.querySelector('.sidebar__project');
    sidebarUl.innerHTML = '';
    todoList.forEach(todo => {
      const sidebarLi = createElement('li', 'sidebar__project-item');
      sidebarLi.dataset.id = todo.projectId;

      const projectTitle = createElement('h3', 'sidebar__project-title', todo.projectTitle);

      sidebarLi.appendChild(projectTitle);
      sidebarUl.appendChild(sidebarLi);
      
      events.sidebarEvents();
    });
  };

  const renderTodo = (index) => {
    const main = document.querySelector('.main');
    main.innerHTML = '';

    const projectHeader = createElement('div', 'project__header');

    const projectTitle = createElement('h2', 'project__title', todoList[index].projectTitle);

    const projectDeleteBtn = createElement('button', 'project__delete-btn', 'Remove');
    projectDeleteBtn.dataset.id = todoList[index].projectId;

    projectHeader.append(projectTitle, projectDeleteBtn);

    const projectAddTodoBtn = createElement('button', 'project__add-todo-btn', 'Add Todo');
    projectAddTodoBtn.dataset.id = todoList[index].projectId;

    const addTodoIcon = createElement('img', 'project__add-todo-icon');
    addTodoIcon.src = plusImage;

    projectAddTodoBtn.appendChild(addTodoIcon);

    main.append(projectHeader, projectAddTodoBtn);

    todoList[index].projectTodo.forEach(todo => {

      const todoContent = createElement('div', 'todo-content');

      const todoContentHeader = createElement('div', 'todo-content__header');

      const todoContentHeaderLeft = createElement('div', 'todo-content__header-left');

      const todoTitle = createElement('h3', 'todo-title', todo.todoTitle);

      const todoDueDate = createElement('p', 'todo-due-date', 'Due: ');

      const todoDueDateSpan = createElement('span', 'todo-due-date-span', todo.todoDueDate);

      todoDueDate.appendChild(todoDueDateSpan);

      const todoPriority = createElement('p', 'todo-priority', 'Priority: ');

      const todoPrioritySpan = createElement('span', `todo-priority--${todo.todoPriority}`, todo.todoPriority);

      todoPriority.appendChild(todoPrioritySpan);

      todoContentHeaderLeft.append(todoTitle, todoDueDate, todoPriority)

      const todoContentHeaderRight = createElement('div', 'todo-content__header-right');

      const todoEditBtn = createElement('button', 'todo-edit-btn', 'Edit');

      const editTodoIcon = createElement('img', 'todo-edit-icon');
      editTodoIcon.src = penImage;

      todoEditBtn.appendChild(editTodoIcon);

      const todoDeleteBtn = createElement('button', 'todo-delete-btn');
      todoDeleteBtn.dataset.id = todo.todoId;

      const todoDeleteIcon = createElement('img', 'todo-delete-icon');
      todoDeleteIcon.src = xmarkImage;

      todoDeleteBtn.appendChild(todoDeleteIcon);

      todoContentHeaderRight.append(todoEditBtn, todoDeleteBtn)

      todoContentHeader.append(todoContentHeaderLeft, todoContentHeaderRight)

      const todoContentBody = createElement('div', 'todo-content__body');

      const todoContentBodyLeft = createElement('div', 'todo-content__body-left');

      const todoDescriptionHeader = createElement('p', 'todo-description-header', 'Description:');

      const todoDescription = createElement('p', 'todo-description', todo.todoDescription);

      todoContentBodyLeft.append(todoDescriptionHeader, todoDescription)

      const todoContentBodyRight = createElement('div', 'todo-content__body-right');

      const todoCheckBtn = createElement('button', 'todo-check-btn', 'Complete: ');
      todoCheckBtn.dataset.id = todo.todoId;

      const todoCheckFalseIcon = createElement('img', 'todo-check-icon--false');
      todoCheckFalseIcon.src = checkImageFalse;

      todoCheckBtn.appendChild(todoCheckFalseIcon);

      todoContentBodyRight.append(todoCheckBtn)

      todoContentBody.append(todoContentBodyLeft, todoContentBodyRight);

      todoContent.append(todoContentHeader, todoContentBody)

      main.appendChild(todoContent);
    });
  };
  return { renderSidebar, renderTodo }
})();

export { render }