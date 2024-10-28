import { applyMiddleware, compose, createStore } from "redux";
import * as thunk from "redux-thunk";
import rootReducer from "../reducers";

const preloadedState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunk.thunk))
  );

  return store;
};
