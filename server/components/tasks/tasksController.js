let DATA = [{ id: 1, text: "Task 1", done: false }];

export const getTasks = (req, res) => {
  res.status(200).send(DATA);
};

export const addTask = (req, res) => {
  const { text } = req.body;
  const newTask = { id: Math.random(), text, done: false };
  DATA.push(newTask);
  res.status(200).send(newTask);
};

export const deleteTask = (req, res) => {
  const { id } = req.body;

  DATA = DATA.filter((task) => task.id !== id);

  res.status(200).send();
};

export const editTask = (req, res) => {
  const { id, text } = req.body;

  DATA = DATA.map((task) => {
    if (task.id !== id) {
      return task;
    }

    const editedTask = { ...task, text: text };
    return editedTask;
  });

  res.status(200).send();
};

export const toggleTask = (req, res) => {
  const { id } = req.body;
  let toggledTask;

  DATA = DATA.map((task) => {
    if (task.id !== id) {
      return task;
    }

    toggledTask = { ...task, done: !task.done };
    return toggledTask;
  });

  res.status(200).send(toggledTask);
};
