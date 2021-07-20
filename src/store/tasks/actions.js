// @flow

import type {
  LoadRequestAction,
  LoadRequestErrorAction,
  ThunkAction,
} from "./types";

import axios from "axios";

const TASKS_URL = "http://localhost:8000/tasks";

const loadRequest = (): LoadRequestAction => ({
  type: "tasks/loadRequest",
  payload: { status: "loading" },
});

const loadRequestError = (error: string): LoadRequestErrorAction => ({
  type: "tasks/loadRequestError",
  payload: { status: "error", error },
});

// Thunk Actions

export const fetchTasks = (): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loadRequest());
    try {
      const response = await axios.get(TASKS_URL);

      dispatch({
        type: "tasks/fetchTasksSuccess",
        payload: { tasks: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch(loadRequestError("Error fetching tasks"));
    }
  };
};

export const addTask = (text: string): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loadRequest());
    try {
      const response = await axios.post(`${TASKS_URL}/addTask`, { text });

      dispatch({
        type: "tasks/addTaskSuccess",
        payload: { task: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch(loadRequestError("Error adding task"));
    }
  };
};

export const deleteTask = (id: number): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loadRequest());
    try {
      await axios.post(`${TASKS_URL}/deleteTask/${id}`);

      dispatch({
        type: "tasks/deleteTaskSuccess",
        payload: { id, status: "succeeded" },
      });
    } catch (err) {
      dispatch(loadRequestError("Error deleting task"));
    }
  };
};

export const editTask = (id: number, text: string): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loadRequest());
    try {
      const response = await axios.post(`${TASKS_URL}/editTask/${id}`, {
        text,
      });

      dispatch({
        type: "tasks/editTaskSuccess",
        payload: { task: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch(loadRequestError("Error editing task"));
    }
  };
};

export const toggleTask = (id: number): ThunkAction => {
  return async (dispatch, getState) => {
    dispatch(loadRequest());
    try {
      const response = await axios.post(`${TASKS_URL}/toggleTask/${id}`);

      dispatch({
        type: "tasks/toggleTaskSuccess",
        payload: { task: response.data, status: "succeeded" },
      });
    } catch (err) {
      dispatch(loadRequestError("Error toggling task"));
    }
  };
};
