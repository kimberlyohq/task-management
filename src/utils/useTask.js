// @flow
import { useReducer } from "react";

export type TaskType = {
  id: number,
  text: string,
  done: boolean,
};

type IDPayload = $PropertyType<TaskType, "id">; 
type EditPayload = $Diff<TaskType, { done: boolean }>;

type Action =
  | { type: "ADD_TASK", payload: TaskType }
  | { type: "DELETE_TASK", payload: IDPayload }
  | { type: "EDIT_TASK", payload: EditPayload}
  | { type: "TOGGLE_TASK", payload: IDPayload }
  | { type: "GET_TASKS" };

const taskReducer = (state: TaskType[], action: Action): TaskType[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      const filteredTasks = state.filter((task) => task.id !== action.payload);
      return filteredTasks;
    case "EDIT_TASK":
      const { id, text } = action.payload;
      const updatedTasks = state.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const editedTask = { ...task, text };
        return editedTask;
      });

      return updatedTasks;
    case "TOGGLE_TASK": {
      const id = action.payload;
      const updatedTasks = state.map((task) => {
        if (task.id !== id) {
          return task;
        }
        const editedTask = { ...task, done: !task.done };
        return editedTask;
      });

      return updatedTasks;
    }
    //all reducers action just need update the state,
    // case "GET_TASKS": {
    //   return state.slice();
    // }
    default:
      return state;
  }
};

export const useTask = (): ({
  addTask: (text: string) => void,
  deleteTask: (id: number) => void,
  editTask: (id: number, text: string) => void,
  tasks: Array<TaskType>,
  toggleTask: (id: number) => void,
}) => {
  const [state, dispatch] = useReducer(taskReducer, []);

  const addTask = (text) => {
    const newTask = { id: Math.random(), text, done: false };
    dispatch({ type: "ADD_TASK", payload: newTask });
  };

  const deleteTask = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const editTask = (id: number, text: string) => {
    const payload = { id, text };
    dispatch({ type: "EDIT_TASK", payload });
  };

  const toggleTask = (id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };



  return {
    tasks: state,
    addTask,
    deleteTask,
    editTask,
    toggleTask,
  };
};
