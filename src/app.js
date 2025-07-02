import { format } from "date-fns";

const app = (() => {
  const today = format(new Date(), 'MMMM dd, yyyy');

  const savedTodoList = JSON.parse(localStorage.getItem('todoList'));
  const todoList = savedTodoList && savedTodoList.length > 0 ? savedTodoList : [{
    projectTitle: 'Getting Started',
    projectId: crypto.randomUUID(),
    projectTodo: [{
      todoTitle: 'Add your first real task',
      todoDueDate: today,
      todoPriority: 'Medium',
      todoDescription: 'Let\'s get started!',
      todoCheck: false,
      todoId: crypto.randomUUID()
    }]
  }];
 

  const createProject = (title) => {
    todoList.push({
      projectTitle: title,
      projectId: crypto.randomUUID(),
      projectTodo: []
    });
    localStorage.setItem('todoList', JSON.stringify(app.todoList));
  }

  const createTodo = (index, title, dueDate, priority, description) => {
    todoList[index].projectTodo.push({
      todoTitle: title,
      todoDueDate: dueDate,
      todoPriority: priority,
      todoDescription: description,
      todoCheck: false,
      todoId: crypto.randomUUID()
    });
    localStorage.setItem('todoList', JSON.stringify(app.todoList));
  };

  return { todoList, createProject, createTodo }
})();

export { app }