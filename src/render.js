import { app } from "./app";

const render = (() => {
  const todoList = app.todoList;
  const renderSidebar = () => {
    const sidebarUl = document.querySelector('.sidebar__project');
    sidebarUl.innerHTML = '';
    todoList.forEach(todo => {
      const sidebarLi = document.createElement('li');
      sidebarLi.classList.add('sidebar__project-item');
      const projectTitle = document.createElement('h3');
      projectTitle.innerText = todo.projectTitle;
      projectTitle.classList.add('sidebar__project-title'); 
      sidebarLi.appendChild(projectTitle);
      sidebarUl.appendChild(sidebarLi);
    });
  };
  return { renderSidebar, }
})();

export { render }