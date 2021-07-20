import { promises as fs } from "fs";

const FILEPATH = "components/tasks/taskData.json";

export const getTasks = async (req, res) => {
  try {
    const data = await fs.readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);
    res.status(200).send(parsedData.tasks);
  } catch (err) {
    res.status(400).send({ error: "Error fetching tasks" });
  }
};

export const addTask = async (req, res) => {
  const { text } = req.body;
  const newTask = { id: Math.random(), text, done: false };

  try {
    const data = await fs.readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);
    parsedData.tasks.push(newTask);

    await fs.writeFile(FILEPATH, JSON.stringify(parsedData));
    res.status(200).send(newTask);
  } catch (err) {
    res.status(404).send({ error: "Error adding tasks" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);

    const updatedTasks = parsedData.tasks.filter(
      (task) => task.id !== Number(id)
    );

    parsedData.tasks = updatedTasks;

    await fs.writeFile(FILEPATH, JSON.stringify(parsedData));
    res.status(200).send();
  } catch (err) {
    res.status(404).send({ error: "Error deleting tasks" });
  }
};

export const editTask = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  let editedTask;

  try {
    const data = await fs.readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);

    const updatedTasks = parsedData.tasks.map((task) => {
      if (task.id !== Number(id)) {
        return task;
      }

      editedTask = { ...task, text };
      return editedTask;
    });

    parsedData.tasks = updatedTasks;

    await fs.writeFile(FILEPATH, JSON.stringify(parsedData));
    res.status(200).send(editedTask);
  } catch (err) {
    res.status(404).send({ error: "Error editing tasks" });
  }
};

export const toggleTask = async (req, res) => {
  const { id } = req.params;
  let toggledTask;

  try {
    const data = await fs.readFile(FILEPATH, "utf-8");
    const parsedData = JSON.parse(data);

    const updatedTasks = parsedData.tasks.map((task) => {
      if (task.id !== Number(id)) {
        return task;
      }

      toggledTask = { ...task, done: !task.done };
      return toggledTask;
    });

    parsedData.tasks = updatedTasks;

    await fs.writeFile(FILEPATH, JSON.stringify(parsedData));
    res.status(200).send(toggledTask);
  } catch (err) {
    res.status(404).send({ error: "Error toggling tasks" });
  }
};
