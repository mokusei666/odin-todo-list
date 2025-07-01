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
    const createProjectBtn = document.querySelector('.sidebar__create-project-btn');
    createProjectBtn.addEventListener('click', () => {
      const projectDialog = document.querySelector('.project-dialog');
      projectDialog.showModal();
    });
    const projectFormSubmitBtn = document.querySelector('.form__project-submit-btn');
    projectFormSubmitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const projectDialog = document.querySelector('.project-dialog');
      const projectForm = document.querySelector('.project-form');
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
      const projectDialog = document.querySelector('.project-dialog');
      const projectForm = document.querySelector('.project-form');
      projectDialog.close();
      projectForm.reset();
    })
  }
  return { sidebarEvents, projectForm }
})();

export { events }