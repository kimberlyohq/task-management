// @flow

export type TaskPayload = {
  +id: number,
  +text: string,
  +done: boolean,
};

type TaskIdPayload = $PropertyType<TaskPayload, "id">;
type EditTaskPayload = $Diff<TaskPayload, { done: boolean }>;
type ToggleTaskPayload = $Diff<TaskPayload, { text: string }>;

export type AddTaskAction = {
  type: "tasks/addTask",
  payload: { task: TaskPayload },
};
export type DeleteTaskAction = {
  type: "tasks/deleteTask",
  payload: TaskIdPayload,
};
export type EditTaskAction = {
  type: "tasks/editTask",
  payload: EditTaskPayload,
};
export type ToggleTaskAction = {
  type: "tasks/toggleTask",
  payload: ToggleTaskPayload,
};

// Fetch Tasks
export type FetchTasksRequest = {
  type: "tasks/fetchTasksRequest",
  payload: { status: "loading" },
};

export type FetchTasksSuccess = {
  type: "tasks/fetchTasksSuccess",
  payload: { tasks: TaskPayload[], status: "succeeded" },
};

export type FetchTasksError = {
  type: "tasks/fetchTasksError",
  payload: { status: "error", error: string },
};

// Add Task
export type Action =
  | AddTaskAction
  | DeleteTaskAction
  | EditTaskAction
  | ToggleTaskAction
  | FetchTasksRequest
  | FetchTasksSuccess
  | FetchTasksError;
export type State = {
  // make redux state immutable
  +tasks: Array<TaskPayload>,
  +status: "idle" | "loading" | "succeeded" | "error",
  +error: string | null,
};

export type GetState = () => State;
export type PromiseAction = Promise<Action>;
// eslint-disable-next-line no-use-before-define
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
