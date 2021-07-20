// @flow

import type { State, Action } from "./types";

const initialState: State = {
  tasks: [],
  status: "idle",
  error: null,
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "tasks/resetStatus": {
      return { ...state, status: "idle", error: null };
    }
    case "tasks/loadRequest": {
      const { status } = action.payload;
      return { ...state, status };
    }
    case "tasks/loadRequestError": {
      const { status, error } = action.payload;
      return { ...state, status, error };
    }
    case "tasks/fetchTasksSuccess": {
      const { tasks, status } = action.payload;
      return { ...state, status, tasks: tasks, error: null };
    }
    case "tasks/addTaskSuccess": {
      const { task, status } = action.payload;
      return { ...state, status, tasks: [...state.tasks, task], error: null };
    }
    case "tasks/deleteTaskSuccess": {
      const { id, status } = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      return { ...state, status, tasks: updatedTasks, error: null };
    }
    case "tasks/toggleTaskSuccess": {
      const { task: toggledTask, status } = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== toggledTask.id) {
          return task;
        }
        return toggledTask;
      });
      return { ...state, status, tasks: updatedTasks, error: null };
    }
    case "tasks/editTaskSuccess":
      const { task: editedTask, status } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== editedTask.id) {
          return task;
        }
        return editedTask;
      });

      return { ...state, status, tasks: updatedTasks, error: null };
    default:
      return state;
  }
};
