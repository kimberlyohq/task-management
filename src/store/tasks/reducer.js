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
    case "tasks/editTaskRequest":
    case "tasks/toggleTaskRequest":
    case "tasks/fetchTasksRequest": {
      const { status } = action.payload;
      return { ...state, status };
    }
    case "tasks/addTaskError":
    case "tasks/deleteTaskError":
    case "tasks/editTaskError":
    case "tasks/toggleTaskError":
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
    case "tasks/toggleTaskSuccess": {
      const { task: toggledTask } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== toggledTask.id) {
          return task;
        }
        return toggledTask;
      });
      return { ...state, tasks: updatedTasks };
    }
    case "tasks/editTaskSuccess":
      const { task: editedTask } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== editedTask.id) {
          return task;
        }
        return editedTask;
      });

      return { ...state, tasks: updatedTasks };
    default:
      return state;
  }
};
