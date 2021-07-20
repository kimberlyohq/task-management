// @flow

export type TaskPayload = {
  +id: number,
  +text: string,
  +done: boolean,
};

type TaskIdPayload = $PropertyType<TaskPayload, "id">;

export type LoadRequestAction = {
  type: "tasks/loadRequest",
  payload: { status: "loading" },
};

export type LoadRequestErrorAction = {
  type: "tasks/loadRequestError",
  payload: { status: "error", error: string },
};

// Fetch Tasks
export type FetchTasksSuccess = {
  type: "tasks/fetchTasksSuccess",
  payload: { tasks: TaskPayload[], status: "succeeded" },
};

export type FetchTasksError = {
  type: "tasks/fetchTasksError",
  payload: { status: "error", error: string },
};

// Add Task
export type AddTaskSuccess = {
  type: "tasks/addTaskSuccess",
  payload: { task: TaskPayload, status: "succeeded" },
};

export type AddTaskError = {
  type: "tasks/addTaskError",
  payload: { status: "error", error: string },
};

// Delete Task
export type DeleteTaskSuccess = {
  type: "tasks/deleteTaskSuccess",
  payload: { id: TaskIdPayload, status: "succeeded" },
};

export type DeleteTaskError = {
  type: "tasks/deleteTaskError",
  payload: { status: "error", error: string },
};

// Edit Task
export type EditTaskSuccess = {
  type: "tasks/editTaskSuccess",
  payload: { task: TaskPayload, status: "succeeded" },
};
export type EditTaskError = {
  type: "tasks/editTaskError",
  payload: { status: "error", error: string },
};

// Toggle Task
export type ToggleTaskSuccess = {
  type: "tasks/toggleTaskSuccess",
  payload: { task: TaskPayload, status: "succeeded" },
};
export type ToggleTaskError = {
  type: "tasks/toggleTaskError",
  payload: { status: "error", error: string },
};
export type Action =
  | LoadRequestAction
  | LoadRequestErrorAction
  | AddTaskSuccess
  | DeleteTaskSuccess
  | EditTaskSuccess
  | ToggleTaskSuccess
  | FetchTasksSuccess;

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
