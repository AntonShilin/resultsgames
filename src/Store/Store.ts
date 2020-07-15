import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import { stateReducer } from "../Reducer/stateReducer";
import thunk from "redux-thunk";
import { filterReducer } from "../Reducer/calendarReducer";



const rootReducer = combineReducers({
  allResults: stateReducer,
  filter: filterReducer,
});

export type IApplicationState = ReturnType<typeof rootReducer>

export const configureStore = () => {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  store.subscribe(() => console.log("Store subscribe", store.getState()));
  return store;
};
