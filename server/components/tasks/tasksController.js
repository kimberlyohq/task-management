import fs from "fs";

const FILEPATH = "components/tasks/taskData.json";

export const getTasks = (req, res) => {
  // readFile is asynchronous
  fs.readFile(FILEPATH, "utf-8", (err, jsonString) => {
    if (err) {
      console.log(err);
      res.status(404).send({ error: "Error fetching tasks" });
    } else {
      try {
        // synchronous
        const data = JSON.parse(jsonString);

        const tasks = data.tasks.map((task) => task);
        res.status(200).send(tasks);
      } catch (err) {
        res.status(404).send({ error: "Error fetching tasks" });
      }
    }
  });
};

export const addTask = (req, res) => {
  const { text } = req.body;
  const newTask = { id: Math.random(), text, done: false };

  fs.readFile(FILEPATH, "utf-8", (err, jsonString) => {
    if (err) {
      console.log(err);
      res.status(404).send({ error: "Error adding tasks" });
    } else {
      try {
        const data = JSON.parse(jsonString);

        data.tasks.push(newTask);
        fs.writeFile(FILEPATH, JSON.stringify(data), (err, jsonString) => {
          if (err) {
            res.status(404).send({ error: "Error adding tasks" });
          } else {
            res.status(200).send(newTask);
          }
        });
      } catch (err) {
        res.status(404).send({ error: "Error adding tasks" });
      }
    }
  });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  fs.readFile(FILEPATH, "utf-8", (err, jsonString) => {
    if (err) {
      console.log(err);
      res.status(404).send({ error: "Error adding tasks" });
    } else {
      try {
        const data = JSON.parse(jsonString);

        const updatedTasks = data.tasks.filter(
          (task) => task.id !== Number(id)
        );
        data.tasks = updatedTasks;
        fs.writeFile(FILEPATH, JSON.stringify(data), (err, jsonString) => {
          if (err) {
            res.status(404).send({ error: "Error deleting tasks" });
          } else {
            res.status(200).send();
          }
        });
      } catch (err) {
        res.status(404).send({ error: "Error deleting tasks" });
      }
    }
  });
};

export const editTask = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  let editedTask;

  fs.readFile(FILEPATH, "utf-8", (err, jsonString) => {
    if (err) {
      console.log(err);
      res.status(404).send({ error: "Error editing tasks" });
    } else {
      try {
        const data = JSON.parse(jsonString);

        const updatedTasks = data.tasks.map((task) => {
          if (task.id !== Number(id)) {
            return task;
          }

          editedTask = { ...task, text };
          return editedTask;
        });

        data.tasks = updatedTasks;

        fs.writeFile(FILEPATH, JSON.stringify(data), (err, jsonString) => {
          if (err) {
            res.status(404).send({ error: "Error editing tasks" });
          } else {
            res.status(200).send(editedTask);
          }
        });
      } catch (err) {
        res.status(404).send({ error: "Error editing tasks" });
      }
    }
  });
};

export const toggleTask = (req, res) => {
  const { id } = req.params;
  let toggledTask;

  fs.readFile(FILEPATH, "utf-8", (err, jsonString) => {
    if (err) {
      console.log(err);
      res.status(404).send({ error: "Error toggling tasks" });
    } else {
      try {
        const data = JSON.parse(jsonString);

        const updatedTasks = data.tasks.map((task) => {
          if (task.id !== Number(id)) {
            return task;
          }

          toggledTask = { ...task, done: !task.done };
          return toggledTask;
        });

        data.tasks = updatedTasks;

        fs.writeFile(FILEPATH, JSON.stringify(data), (err, jsonString) => {
          if (err) {
            res.status(404).send({ error: "Error toggling tasks" });
          } else {
            res.status(200).send(toggledTask);
          }
        });
      } catch (err) {
        res.status(404).send({ error: "Error toggling tasks" });
      }
    }
  });
};
