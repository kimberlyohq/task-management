// @flow

type TaskPayload = {
  +id: number,
  +text: string,
  +done: boolean,
};

type TaskIdPayload = $PropertyType<TaskPayload, "id">;
type EditTaskPayload = $Diff<TaskPayload, { done: boolean }>;

export type AddTaskAction = { type: "tasks/addTask", payload: TaskPayload };
export type DeleteTaskAction = { type: "tasks/deleteTask", payload: TaskIdPayload };
export type EditTaskAction = { type: "tasks/editTask", payload: EditTaskPayload };
export type GetTasksAction = { type: "tasks/getTasks" };
export type ToggleTaskAction = { type: "tasks/toggleTask", payload: TaskIdPayload };

type Action =
  | AddTaskAction
  | DeleteTaskAction
  | EditTaskAction
  | GetTasksAction
  | ToggleTaskAction;

type State = {
  // make redux state immutable 
  +tasks: Array<TaskPayload>,
};

type GetState = () => State;
type PromiseAction = Promise<Action>;
// eslint-disable-next-line no-use-before-define
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
