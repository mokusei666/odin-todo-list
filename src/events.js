import { app } from "./app";
import { render } from "./render";
const events = (() => {
  const sidebarEvents = () => {
    const sidebarProject = document.querySelectorAll('.sidebar__project-item');
    sidebarProject.forEach(project => {
      project.addEventListener('click', () => {
        const todoList = app.todoList;
        const id = project.dataset.id;
        const index = todoList.findIndex(project => project.projectId === id);
        render.renderTodo(index);
      });
    });
  };
  const projectForm = () => {
    const projectDialog = document.querySelector('.project-dialog');
    const projectForm = document.querySelector('.project-form');
    const createProjectBtn = document.querySelector('.sidebar__create-project-btn');
    createProjectBtn.addEventListener('click', () => {

      projectDialog.showModal();
    });
    const projectFormSubmitBtn = document.querySelector('.form__project-submit-btn');
    projectFormSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const projectName = document.getElementById('form__project-name').value;
      if (!projectForm.checkValidity()) {
        projectForm.reportValidity();
        return;
      } else {
        app.createProject(projectName);
        render.renderSidebar();
        projectForm.reset();
        projectDialog.close();
        return;
      };
    });
    const projectFormCancelBtn = document.querySelector('.form__project-cancel-btn');
    projectFormCancelBtn.addEventListener('click', () => {
      projectDialog.close();
      projectForm.reset();
    });
  };
  const addTodo = () => {
    const todoDialog = document.querySelector('.todo-dialog');
    const todoForm = document.querySelector('.todo-form');
    const addTodoButton = document.querySelector('.project__add-todo-btn');
    addTodoButton.addEventListener('click', (button) => {
      todoDialog.showModal();   
    });
    const todoSubmitButton = document.querySelector('.form__todo-submit-btn');
    todoSubmitButton.addEventListener('click', (event) => {
      const id = addTodoButton.dataset.id;
      const index = app.todoList.findIndex(project => project.projectId === id)
      const todoTitle = document.getElementById('form__todo-title').value;
      const todoDueDate = document.getElementById('form__todo-date').value;
      const todoPriority = document.getElementById('form__todo-priority').value;
      const todoDescription = document.getElementById('form__todo-description').value;
      event.preventDefault();
      if (!todoForm.checkValidity()) {
        todoForm.reportValidity();
        return;
      } else {
        app.createTodo(index, todoTitle, todoDueDate, todoPriority, todoDescription);
        render.renderTodo(index);
        todoDialog.close();
        todoForm.reset();
      }
    });
    const todoCancelButton = document.querySelector('.form__todo-cancel-btn');
    todoCancelButton.addEventListener('click', () => {
      todoDialog.close();
      todoForm.reset();
    })
  };

  const deleteProject = () => {
    const deleteProjectButton = document.querySelector('.project__delete-btn');
    deleteProjectButton.addEventListener('click', () => {
      const id = deleteProjectButton.dataset.id;
      const index = app.todoList.findIndex(project => project.projectId === id);
      app.todoList.splice(index, 1);
      document.querySelector('.project-container').innerHTML = '';
      render.renderSidebar();
    })
  }
  return { sidebarEvents, projectForm, addTodo, deleteProject }
})();

export { events }