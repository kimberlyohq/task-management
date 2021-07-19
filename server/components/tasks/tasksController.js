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
  const { id } = req.params;

  DATA = DATA.filter((task) => task.id !== Number(id));

  res.status(200).send();
};

export const editTask = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  let editedTask;

  DATA = DATA.map((task) => {
    if (task.id !== Number(id)) {
      return task;
    }

    editedTask = { ...task, text };
    return editedTask;
  });

  if (!editedTask) {
    res.status(404).send({ message: "Task not found" });
  }

  res.status(200).send();
};

export const toggleTask = (req, res) => {
  const { id } = req.params;

  let toggledTask;

  DATA = DATA.map((task) => {
    if (task.id !== Number(id)) {
      return task;
    }

    toggledTask = { ...task, done: !task.done };

    return toggledTask;
  });

  res.status(200).send(toggledTask);
};
