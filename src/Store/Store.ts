import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { stateReducer } from "../Reducer/stateReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  allResults: stateReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);
store.subscribe(() => console.log("Store subscribe", store.getState()));
