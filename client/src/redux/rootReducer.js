import { combineReducers } from "redux";

import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  userData: userReducer,
});

export default rootReducer;
