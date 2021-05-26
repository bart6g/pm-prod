import React, { useState, useContext, useEffect } from "react";
import OpenFlow from "./OpenFlow";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TankContext } from "../../../context/tankContext";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { auth } from "../../common/auth";
import { openData, openState } from "./openData";
import ClosedFlow from "./ClosedFlow";
import {
  ModelContainer,
  ModelInfo,
  ModelRadio,
  RadioContainer,
} from "./modelElements";
import { ModelLearn } from "./ModelLearn";
import Button from "@material-ui/core/Button";
const Model = () => {
  const [local, setLocal] = useState("close");
  const [localTankArr, setLocalTankArr] = useState([]);
  const {
    handleCleanState,
    pageObj,

    setReactorType,
    handleCleanEverything,
  } = useContext(TankContext);
  let history = useHistory();
  const [wasLogged, setWasLogged] = useState(false);
  const { loggedIn } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    //checks if user is logged in
    auth(setWasLogged, dispatch, history);
  }, [loggedIn]);

  useEffect(() => {
    setReactorType(local);
  }, [local]);

  useEffect(() => {
    if (!pageObj[0].validation) {
      if (local === "open") {
        setLocalTankArr(JSON.parse(JSON.stringify(openData)));
        handleCleanState(
          JSON.parse(JSON.stringify(openData)),
          JSON.parse(JSON.stringify(openState))
        );
        console.log("usunięto");
      } else {
        console.log("usunięto");
        setLocalTankArr([]);
        handleCleanState([], []);
      }
      console.log(localTankArr);
    }
  }, [local]);

  return (
    <ModelContainer>
      {wasLogged ? (
        pageObj[0].validation ? (
          <ModelInfo>
            <p>
              Walidacja pomyślna, aby przeprowadzić symulację przejdź do
              zakładki "Symulacja". Aby wyczyścic dotychczasowy model, kliknij
              przycisk poniżej
            </p>
            <br />
            <Button
              variant="contained"
              color="primary"
              className="submit"
              onClick={() => handleCleanEverything()}
            >
              Nowy model
            </Button>
            {/* <button onClick={() => handleCleanEverything()}>New model</button> */}
          </ModelInfo>
        ) : (
          <>
            <ModelLearn />
            <ModelRadio>
              <RadioContainer>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                >
                  <FormControlLabel
                    value="close"
                    control={<Radio />}
                    label="Zamkniety"
                  />
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Otwarty"
                  />
                </RadioGroup>
              </RadioContainer>
              {local === "open" ? <OpenFlow /> : <ClosedFlow />}
            </ModelRadio>
          </>
        )
      ) : (
        <p>
          You're not authorized, please <a href="/">log in</a>!
        </p>
      )}
    </ModelContainer>
  );
};

export default Model;
