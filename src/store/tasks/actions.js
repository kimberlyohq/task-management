// @flow

import type {
  AddTaskAction,
  DeleteTaskAction,
  EditTaskAction,
  ToggleTaskAction,
  TaskPayload,
  ThunkAction,
} from "./types";

import axios from "axios";

const TASKS_URL = "http://localhost:8000/tasks";

// Action Creators

const addTask = (task: TaskPayload): AddTaskAction => {
  return { type: "tasks/addTask", payload: { task } };
};

const deleteTask = (id: number): DeleteTaskAction => {
  return { type: "tasks/deleteTask", payload: id };
};

const editTask = (id: number, text: string): EditTaskAction => {
  const payload = { id, text };
  return { type: "tasks/editTask", payload };
};

const toggleTask = (id: number, done: boolean): ToggleTaskAction => {
  return { type: "tasks/toggleTask", payload: { id, done } };
};

// Thunk Actions

export const fetchTasks = (): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch({
      type: "tasks/fetchTasksRequest",
      payload: { status: "loading" },
    });
    try {
      const response = await axios.get(TASKS_URL);

      dispatch({
        type: "tasks/fetchTasksSuccess",
        payload: { tasks: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch({
        type: "tasks/fetchTasksError",
        payload: { status: "error", error: "Error fetching data" },
      });
    }
  };
};

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
