// @flow

import type { State, Action } from "./types";

const initialState: State = {
  tasks: [],
  status: "idle",
  error: null,
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "tasks/addTaskRequest":
    case "tasks/deleteTaskRequest":
    case "tasks/fetchTasksRequest": {
      const { status } = action.payload;
      return { ...state, status };
    }
    case "tasks/addTaskError":
    case "tasks/deleteTaskError":
    case "tasks/fetchTasksError": {
      const { status, error } = action.payload;
      return { ...state, status, error };
    }
    case "tasks/fetchTasksSuccess": {
      const { tasks, status } = action.payload;
      return { ...state, status, tasks: tasks };
    }
    case "tasks/addTaskSuccess": {
      const { task, status } = action.payload;
      return { ...state, status, tasks: [...state.tasks, task] };
    }
    case "tasks/deleteTaskSuccess": {
      const { id, status } = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      return { ...state, status, tasks: updatedTasks };
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
