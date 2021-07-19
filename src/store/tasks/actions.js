// @flow

import type {
  AddTaskAction,
  DeleteTaskAction,
  EditTaskAction,
  GetTasksAction,
  ToggleTaskAction,
  TaskPayload,
  ThunkAction,
} from "./types";

import axios from "axios";

const URL = "http://localhost:8000/tasks";

// Action Creators

export const addTask = (task: TaskPayload): AddTaskAction => {
  return { type: "tasks/addTask", payload: { task } };
};

export const deleteTask = (id: number): DeleteTaskAction => {
  return { type: "tasks/deleteTask", payload: id };
};

export const editTask = (id: number, text: string): EditTaskAction => {
  const payload = { id, text };
  return { type: "tasks/editTask", payload };
};

export const getTasks = (tasks: TaskPayload[]): GetTasksAction => {
  return { type: "tasks/getTasks", payload: { tasks } };
};

export const toggleTask = (id: number, done: boolean): ToggleTaskAction => {
  return { type: "tasks/toggleTask", payload: {id, done} };
};

export const fetchTasks = (): ThunkAction => {
  return (dispatch, getState) => {
    axios.get(URL).then((response) => {
      dispatch(getTasks(response.data));
    });
  };
};

export const saveTask = (text: string): ThunkAction => {
  return (dispatch, getState) => {
    axios.post(`${URL}/addTask`, { text }).then((response) => {
      console.log(response.data);
      dispatch(addTask(response.data));
    });
  };
};

export const deleteTaskAsync = (id: number): ThunkAction => {
  return (dispatch, getState) => {
    axios.post(`${URL}/deleteTask`, { id }).then((response) => {
      console.log(response.status);
      dispatch(deleteTask(id));
    });
  };
};

export const editTaskAsync = (id: number, text: string): ThunkAction => {
  return (dispatch, getState) => {
    axios.post(`${URL}/editTask`, { id, text}).then((response) => {
      console.log(response.status);
      dispatch(editTask(id, text));
    });
  };
};

export const toggleTaskAsync = (id: number): ThunkAction => {
  return (dispatch, getState) => {
    axios.post(`${URL}/toggleTask`, { id }).then((response) => {
      const { done } = response.data;
      dispatch(toggleTask(id, done));
    });
  };
};
