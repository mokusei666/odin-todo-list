const app = (() => {
  const todoList = [];
  const createProject = (title) => {
    todoList.push({
      title,
      id: crypto.randomUUID(),
      todo: []
    })
  }

  return { todoList, createProject, }
})();

export { app }