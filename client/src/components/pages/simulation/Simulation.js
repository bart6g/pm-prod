import React, { useState, useContext, useEffect } from "react";
import { TankContext } from "../../../context/tankContext";
import { simulate } from "../../../api/simulationFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../common/auth";
import ClosedSimulation from "./ClosedSimulation";
import OpenSimulation from "./OpenSimulation";

const Simulation = () => {
  const { reactorType } = useContext(TankContext);
  const { loggedIn } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  let history = useHistory();
  const [wasLogged, setWasLogged] = useState(false);
  useEffect(() => {
    //checks if user is logged in
    auth(setWasLogged, dispatch, history);
  }, [loggedIn]);
  return (
    <div>
      <>
        {wasLogged ? (
          <>
            {reactorType === "close" ? (
              <ClosedSimulation />
            ) : (
              <OpenSimulation />
            )}
          </>
        ) : (
          <p>
            You're not authorized, please <a href="/">log in</a>!
          </p>
        )}
      </>
    </div>
  );
};

export default Simulation;
