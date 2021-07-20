// @flow
import * as React from "react";
import { useMemo, useEffect } from "react";
import "./App.css";
import { Task } from "./components/Task";
import { TaskForm } from "./components/TaskForm";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  resetStatus,
} from "./store/tasks/actions";

function App(): React.Element<"div"> {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.error);

  // Fetch tasks from server when the app first mounts
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  useEffect(() => {
    if (!errorMsg) {
      return;
    }
    alert(errorMsg);
    dispatch(resetStatus());
  }, [errorMsg]);

  const tasks = useSelector((state) => state.tasks);

  const activeTasks = useMemo(() => tasks.filter((task) => !task.done).length, [
    tasks,
  ]);

  return (
    <div className="App">
      <h1>Tasks ✅</h1>
      <h4>{activeTasks} active tasks</h4>
      <TaskForm onSubmit={(text: string) => dispatch(addTask(text))} />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={(id: number) => dispatch(toggleTask(id))}
          onDelete={(id: number) => dispatch(deleteTask(id))}
          onEdit={(id: number, text: string) => dispatch(editTask(id, text))}
        />
      ))}
    </div>
  );
}

export default App;
