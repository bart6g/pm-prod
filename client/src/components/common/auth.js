import { fetchFromLocalStorage } from "../../redux/user/userActions";

export const auth = (setWasLogged, dispatch, history, path) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("x-auth-token");
  if (user && token) {
    setWasLogged(true);
    dispatch(fetchFromLocalStorage(user, token));
    history.push(path);
  } else {
    setWasLogged(false);
  }
};
