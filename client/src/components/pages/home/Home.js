import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";
import { auth } from "../../common/auth";
const Home = () => {
  let history = useHistory();
  const [wasLogged, setWasLogged] = useState(false);
  const { loggedIn } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    auth(setWasLogged, dispatch, history);
  }, [loggedIn]);

  return <>{wasLogged ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Home;
