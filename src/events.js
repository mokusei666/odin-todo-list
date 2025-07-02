import { app } from "./app";
import { render } from "./render";
import { parseISO, format } from "date-fns";

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
      const currentAddTodoButton = document.querySelector('.project__add-todo-btn');
      const id = currentAddTodoButton.dataset.id;
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
        const parsedDate = parseISO(todoDueDate);
        const formattedDate = format(parsedDate, 'MMMM dd, yyyy');
        app.createTodo(index, todoTitle, formattedDate, todoPriority, todoDescription);
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
    });
  };

  const deleteTodo = () => {
    const deleteTodoButton = document.querySelectorAll('.todo-delete-btn');
    deleteTodoButton.forEach(button => {
      button.addEventListener('click', () => {
        const todoContainer = button.closest('.todo-content');
        const projectId = todoContainer.dataset.projectId;
        const projectIndex = app.todoList.findIndex(project => project.projectId === projectId)
        const todoId = button.dataset.id;
        const todoIndex = app.todoList[projectIndex].projectTodo.findIndex(todo => todo.todoId === todoId);
        app.todoList[projectIndex].projectTodo.splice(todoIndex, 1);
        render.renderTodo(projectIndex);
      });
    });
  };

  const toggleCheck = () => {
    const todoCheckButton = document.querySelectorAll('.todo-check-btn');
    todoCheckButton.forEach(button => {
      button.addEventListener('click', () => {
        const todoId = button.dataset.id;
        const todoContainer = button.closest('.todo-content');
        const projectId = todoContainer.dataset.projectId;
        const projectIndex = app.todoList.findIndex(project => project.projectId === projectId);
        const todoIndex = app.todoList[projectIndex].projectTodo.findIndex(todo => todo.todoId === todoId);
        if (app.todoList[projectIndex].projectTodo[todoIndex].todoCheck === false) {
          app.todoList[projectIndex].projectTodo[todoIndex].todoCheck = true;
          render.renderTodo(projectIndex);
          return;
        } else {
          app.todoList[projectIndex].projectTodo[todoIndex].todoCheck = false;
          render.renderTodo(projectIndex);
        }
      })
    })

  }

  return { sidebarEvents, projectForm, addTodo, deleteProject, deleteTodo, toggleCheck }
})();

export { events }