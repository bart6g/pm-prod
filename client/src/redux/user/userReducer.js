import {
  CLEAR_REGISTER,
  REGISTER_USER,
  LOGIN,
  CLEAR_MSG,
  WAS_LOGGED,
  LOGOUT,
} from "./userTypes";

const initialState = {
  user: null,
  token: null,
  msg: "",
  loggedIn: false,
  registerSuccess: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload.user,
        msg: action.payload.msg,
        registerSuccess: action.payload.success,
      };
    case CLEAR_REGISTER:
      return {
        user: null,
        msg: "",
        loggedIn: false,
        registerSuccess: false,
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loggedIn: action.payload.login,
        msg: action.payload.msg,
      };
    case CLEAR_MSG:
      return {
        ...state,
        msg: "",
      };
    case WAS_LOGGED:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loggedIn: action.payload.login,
        msg: action.payload.msg,
      };
    case LOGOUT:
      return {
        user: null,
        token: null,
        msg: "",
        loggedIn: false,
        registerSuccess: false,
      };
    default:
      return state;
  }
};

export default userReducer;
