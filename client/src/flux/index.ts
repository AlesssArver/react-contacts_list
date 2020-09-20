import { Action, applyMiddleware, compose, createStore } from "redux";
import thunk, { ThunkAction } from "redux-thunk";

import rootReducer from "./reducers";

type RootReducerType = typeof rootReducer;
export type IRootState = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  IRootState,
  unknown,
  A
>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
// @ts-ignore
window._store = store;

export default store;
