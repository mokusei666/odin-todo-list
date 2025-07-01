const app = (() => {
  const todoList = [];
  const createProject = (title) => {
    todoList.push({
      title,
      id: crypto.randomUUID(),
      todo: []
    })
  }

  const createTodo = (index, title, dueDate, priority, description) => {
    todoList[index].todo.push({
      title,
      dueDate,
      priority,
      description,
      check: false,
      todoId: crypto.randomUUID()
    });
  };

  return { todoList, createProject, createTodo }
})();

export { app }