import {
  CLEAR_MSG,
  CLEAR_REGISTER,
  LOGIN,
  LOGOUT,
  REGISTER_USER,
  WAS_LOGGED,
} from "./userTypes";
import axios from "axios";

export const registerUser = (user) => async (dispatch) => {
  //user contains login, email, password & passwordRepeat
  try {
    console.log(user);
    const response = await axios.post("/users/register", user);
    if (response) {
      const { user, msg, success } = response.data;
      dispatch({
        type: REGISTER_USER,
        payload: {
          user,
          msg,
          success,
        },
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: REGISTER_USER,
      payload: {
        user: null,
        msg: "Wystąpił błąd, spróbuj ponownie.",
        success: false,
      },
    });
  }
};

export const clearRegisterForm = () => {
  return {
    type: CLEAR_REGISTER,
  };
};

export const loginUser = (user) => async (dispatch) => {
  //user contains login & password

  try {
    const response = await axios.post("/users/login", user);
    if (response) {
      const { login, token, user, msg } = response.data;
      dispatch({
        type: LOGIN,
        payload: {
          login,
          token,
          user,
          msg,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN,
      payload: {
        login: false,
        token: null,
        user: null,
        msg: "Nie można zalogować, spróbuj jeszcze raz",
      },
    });
  }
};

export const clearMsg = () => {
  return {
    type: CLEAR_MSG,
  };
};

export const fetchFromLocalStorage = (user, token) => async (dispatch) => {
  try {
    const data = await axios.get("/users/get-userdata", {
      params: { id: user.id },
    });
    dispatch({
      type: WAS_LOGGED,
      payload: {
        user: data.data,
        token,
        login: true,
        msg: "Zalogowano pomyślnie",
      },
    });
  } catch (err) {
    dispatch({
      type: WAS_LOGGED,
      payload: {
        user: null,
        token: null,
        msg: "Nie można zalogować, spróbuj jeszcze raz",
        login: false,
      },
    });
  }
};
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
