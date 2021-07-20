// @flow

import type {  ToggleTaskAction, ThunkAction } from "./types";

import axios from "axios";

const TASKS_URL = "http://localhost:8000/tasks";

// Action Creators


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

export const addTask = (text: string): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch({
      type: "tasks/addTaskRequest",
      payload: { status: "loading" },
    });
    try {
      const response = await axios.post(`${TASKS_URL}/addTask`, { text });

      dispatch({
        type: "tasks/addTaskSuccess",
        payload: { task: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch({
        type: "tasks/addTaskError",
        payload: { status: "error", error: "Error adding task" },
      });
    }
  };
};

export const deleteTask = (id: number): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch({
      type: "tasks/deleteTaskRequest",
      payload: { status: "loading" },
    });
    try {
      await axios.post(`${TASKS_URL}/deleteTask/${id}`);

      dispatch({
        type: "tasks/deleteTaskSuccess",
        payload: { id, status: "succeeded" },
      });
    } catch (err) {
      dispatch({
        type: "tasks/deleteTaskError",
        payload: { status: "error", error: "Error deleting task" },
      });
    }
  };
};

export const editTask = (id: number, text: string): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch({
      type: "tasks/editTaskRequest",
      payload: { status: "loading" },
    });
    try {
      const response = await axios.post(`${TASKS_URL}/editTask/${id}`, {
        text,
      });

      console.log(response.data);

      dispatch({
        type: "tasks/editTaskSuccess",
        payload: { task: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch({
        type: "tasks/editTaskError",
        payload: { status: "error", error: "Error editing task" },
      });
    }
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
