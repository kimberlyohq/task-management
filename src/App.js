// @flow
import * as React from "react";
import { useMemo } from "react";
import "./App.css";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";
import { useTask } from "./utils/useTask";

function App(): React.Element<"div"> {
  const { tasks, addTask, deleteTask, editTask, toggleTask } = useTask();

  const activeTasks = useMemo(() => tasks.filter((task) => !task.done).length, [
    tasks,
  ]);

  return (
    <div className="App">
      <h1>Tasks ✅</h1>
      <h4>{activeTasks} active tasks</h4>
      <TaskForm onSubmit={addTask} />
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
