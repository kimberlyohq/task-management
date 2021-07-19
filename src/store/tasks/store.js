// @flow

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

export const store: any = createStore(reducer, applyMiddleware(thunk));
