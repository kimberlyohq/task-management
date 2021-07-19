// @flow

import type {
  AddTaskAction,
  DeleteTaskAction,
  EditTaskAction,
  GetTasksAction,
  ToggleTaskAction,
} from "./types";

// Action Creators

export const addTask = (text: string): AddTaskAction => {
  const newTask = { id: Math.random(), text, done: false };
  return { type: "tasks/addTask", payload: newTask };
};

export const deleteTask = (id: number): DeleteTaskAction => {
  return { type: "tasks/deleteTask", payload: id };
};

export const editTask = (id: number, text: string): EditTaskAction => {
  const payload = { id, text };
  return { type: "tasks/editTask", payload };
};

export const getTasks = (): GetTasksAction => {
  return { type: "tasks/getTasks" };
};

export const toggleTask = (id: number): ToggleTaskAction => {
  return { type: "tasks/toggleTask", payload: id };
};
