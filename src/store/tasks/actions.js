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

const TASKS_URL = "http://localhost:8000/tasks";

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
  return { type: "tasks/toggleTask", payload: { id, done } };
};

export const fetchTasks = (): ThunkAction => {
  return (dispatch, getState) => {
    axios.get(TASKS_URL).then((response) => {
      dispatch(getTasks(response.data));
    });
  };
};

// Thunk Actions

export const addTaskAsync = (text: string): ThunkAction => {
  return (dispatch, getState) => {
    axios.post(`${TASKS_URL}/addTask`, { text }).then((response) => {
      dispatch(addTask(response.data));
    });
  };
};

export const deleteTaskAsync = (id: number): ThunkAction => {
  return (dispatch, getState) => {
    axios
      .post(`${TASKS_URL}/deleteTask/${id}`)
      .then((response) => {
        dispatch(deleteTask(id));
      })
      .catch((error) => console.log(error.response.data.message));
  };
};

export const editTaskAsync = (id: number, text: string): ThunkAction => {
  return (dispatch, getState) => {
    axios
      .post(`${TASKS_URL}/editTask/${id}`, { text })
      .then((response) => {
        dispatch(editTask(id, text));
      })
      .catch((error) => console.log(error.response.data.message));
  };
};

export const toggleTaskAsync = (id: number): ThunkAction => {
  return (dispatch, getState) => {
    axios
      .post(`${TASKS_URL}/toggleTask/${id}`, { id })
      .then((response) => {
        const { done } = response.data;
        dispatch(toggleTask(id, done));
      })
      .catch((error) => console.log(error.response.data.message));
  };
};
