import React, { useState, useContext, useEffect } from "react";
import { TankContext } from "../../../context/tankContext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../common/auth";
import SingleResult from "./SingleResult";
import { ResultContainer } from "./resultElements";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

const Result = () => {
  const {
    calculationArr,
    tcalc,
    dt,
    resultArr,
    standardResultArr,
    pageObj,
    handleCleanEverything,
  } = useContext(TankContext);
  const [wasLogged, setWasLogged] = useState(false);
  const { loggedIn } = useSelector((state) => state.userData);
  const [radioButtons, setRadioButtons] = useState([]);
  const [index, setIndex] = useState("0");
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    //checks if user is logged in
    auth(setWasLogged, dispatch, history);
  }, [loggedIn]);

  useEffect(() => {
    const setsCount = calculationArr.length;
    const buttons = [...radioButtons];

    for (let i = 0; i < setsCount; i++) {
      buttons.push(i);
    }
    setRadioButtons(buttons);
  }, []);

  let radiobtns = radioButtons.map((el) => {
    return (
      // <label key={el}>
      //   <input
      //     type="radio"
      //     name="simulationSet"
      //     onChange={() => setIndex(el)}
      //   />
      //   Simulation Set {el}
      // </label>

      <FormControlLabel
        value={`${el}`}
        key={el}
        control={<Radio />}
        label={`Symulacja nr ${el}`}
      />
    );
  });
  return (
    <ResultContainer>
      {wasLogged ? (
        pageObj[2].validation ? (
          <>
            <div className="result-info">
              <p style={{ color: "blue", marginBottom: "15px" }}>
                Symulacja przebiegła poprawnie
              </p>
              <p style={{ maxWidth: "800px" }}>
                Aby przeprowadzić symulację dla nowych danych czasowych, przejdź
                do zakładki "Symulacja". Jeżeli chcesz stworzyć nowy model i
                rozpocząć symulację od nowa, przejdź do zakładki "Model" i
                kliknij przycisk "Nowy Model".
              </p>

              {/* <Button
                variant="contained"
                color="secondary"
                className="submit"
                onClick={() => handleCleanEverything()}
              >
                Nowy model
              </Button> */}
            </div>
            <br />
            <div>
              <RadioGroup
                aria-label="set"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
              >
                {radioButtons.length > 0 ? radiobtns : null}
              </RadioGroup>

              <SingleResult
                indexSet={index}
                key={index}
                set={calculationArr[index]}
                result={resultArr[index]}
                standardResult={standardResultArr[index]}
              />
            </div>
          </>
        ) : (
          <>
            <h1>Stwórz model i przeprowadź symulację, aby zobaczyć wyniki</h1>
          </>
        )
      ) : (
        <>
          You're not logged in. <a href="/">Click here</a>
        </>
      )}
    </ResultContainer>
  );
};

export default Result;
