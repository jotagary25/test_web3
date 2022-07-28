import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import AccountReducer from "../reducers/AccountReducer";
import UserInfoReducer from "../reducers/UserInfoReducer";

const allReducers = combineReducers({
  account: AccountReducer,
  userInfo:UserInfoReducer,
});

const middleware = [thunk];
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };
