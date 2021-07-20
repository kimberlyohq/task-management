// @flow

import type { State, Action } from "./types";

const initialState: State = {
  tasks: [],
  status: "idle",
  error: null,
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "tasks/getTasks": {
      const { tasks } = action.payload;
      return { ...state, tasks: tasks };
    }
    case "tasks/addTask": {
      const { task } = action.payload;
      return { ...state, tasks: [...state.tasks, task] };
    }
    case "tasks/deleteTask": {
      const id = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      return { ...state, tasks: updatedTasks };
    }
    case "tasks/toggleTask": {
      const { id, done } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const toggledTask = { ...task, done };
        return toggledTask;
      });
      return { ...state, tasks: updatedTasks };
    }
    case "tasks/editTask":
      const { id, text } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const editedTask = { ...task, text };
        return editedTask;
      });
      return { ...state, tasks: updatedTasks };
    default:
      return state;
  }
};
