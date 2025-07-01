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
  return { sidebarEvents }
})();

export { events }