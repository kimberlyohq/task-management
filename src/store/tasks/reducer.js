// @flow

import type { State, Action } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "tasks/addTask":
    case "tasks/deleteTask":
    case "tasks/editTask":
    case "tasks/getTasks":
    case "tasks/toggleTask":
      return { ...state };
    default:
      return state;
  }
};
