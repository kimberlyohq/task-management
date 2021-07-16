// @flow
import * as React from "react";

import "./App.css";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";
import { useTask } from "./utils/useTask";


function App(): React.Element<"div"> {
  const { tasks, addTask, deleteTask, editTask, toggleTask } = useTask();

  return (
    <div className="App">
      <TaskForm addTask={addTask} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      ))}
    </div>
  );
}

export default App;
