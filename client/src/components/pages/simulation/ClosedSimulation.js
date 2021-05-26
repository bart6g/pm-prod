import React, { useState, useEffect, useContext } from "react";
import { TankContext } from "../../../context/tankContext";
import { simulate } from "../../../api/simulationFunctions";
import {
  SimulationContainer,
  SimulationDataContainer,
} from "./simulationElements";
import { InfoSetContainer } from "../result/InfoSet";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const ClosedSimulation = () => {
  const {
    calculationArr,
    setCalculationArr,
    validationError,
    validationArray,
    setValidationArray,
    pageObj,
    tcalc,
    dt,
    setTcalc,
    setDt,

    setResultArr,
    handlePageObj,

    setStandardResultArr,
  } = useContext(TankContext);
  const [localSet, setLocalSet] = useState(calculationArr);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [time, setTime] = useState(null);
  const [step, setStep] = useState(null);
  const addNewSet = () => {
    const actualSet = [...localSet];

    const tempArr = JSON.parse(JSON.stringify(actualSet[0]));

    actualSet.push(tempArr);
    setLocalSet(actualSet);
    setCalculationArr(actualSet);
  };

  const handleChangeMassAndVolume = (e, indexOfSet, tankIndex, toChange) => {
    const actualSet = [...localSet];
    actualSet[indexOfSet][tankIndex][toChange] = parseFloat(e.target.value);
    console.log(actualSet);
    setLocalSet(actualSet);
    setCalculationArr(actualSet);
  };
  const handleChangeFlux = (e, indexOfSet, tankIndex, fluxName) => {
    console.log(indexOfSet);
    const actualSet = [...localSet];
    console.log(actualSet[indexOfSet]);
    actualSet[indexOfSet][tankIndex].out.forEach((outObj) =>
      outObj.fluxName === fluxName
        ? (outObj.fluxValue = parseFloat(e.target.value))
        : outObj
    );
    actualSet[indexOfSet].forEach((tank) =>
      tank.in.forEach((inObj) =>
        inObj.fluxName === fluxName
          ? (inObj.fluxValue = parseFloat(e.target.value))
          : inObj
      )
    );
    console.log(actualSet);
    setLocalSet(actualSet);
    setCalculationArr(actualSet);
  };

  const validateSet = (set) => {
    const fluxArr = [];
    set.forEach((tank) => {
      let tempArr = [];
      tank.in.forEach((inObj) => tempArr.push(inObj.fluxValue));
      tank.out.forEach((outObj) => tempArr.push(-outObj.fluxValue));
      fluxArr.push(tempArr.reduce((a, b) => a + b));
    });
    const validationArray = fluxArr.map((el) =>
      el === 0 || (el < 1e-8 && el > 0) ? 0 : 1
    );
    const validation = validationArray.reduce((a, b) => a + b);
    if (validation === 0) {
      return true;
    } else {
      return false;
    }
  };

  const verify = () => {
    const actualCalculationArr = [...calculationArr];
    const tempValidationArr = [];

    actualCalculationArr.forEach((set, index) => {
      if (index === 0) {
        tempValidationArr.push(true);
      } else {
        let isValidated = validateSet(set);
        tempValidationArr.push(isValidated);
      }
    });
    setValidationArray(tempValidationArr);
    const isValidated = tempValidationArr.reduce((a, b) => a && b);
    let message = isValidated
      ? "Walidacja pomyślna"
      : "Błąd walidacji, sprawdź wszystkie dane.";
    handlePageObj("simulation", isValidated, message);

    // console.log("pageobj", pageObj);
    // console.log(isValidated);
    console.log(validationArray);
    if (isValidated) {
      console.log(validationArray);
      console.log("simulation...");
    }
  };
  return (
    <SimulationContainer>
      {calculationArr.length === 0 ? (
        <h1>Stwórz model układu w zakładce MODEL</h1>
      ) : (
        <>
          {pageObj[1].validation ? (
            <SimulationDataContainer>
              <p>
                Walidacja pomyślna, proszę uzupełnić dane i zatwierdzić
                przyciskiem poniżej.
              </p>
              {error ? (
                <p style={{ color: "red" }}>Proszę podać krok czasowy!</p>
              ) : null}
              <br />
              <TextField
                id="outlined-basic"
                label="Czas całkowity [s]"
                variant="outlined"
                className="login"
                onChange={(e) => setTime(parseFloat(e.target.value))}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Krok czasowy [s]"
                variant="outlined"
                className="login"
                onChange={(e) => setStep(parseFloat(e.target.value))}
              />
              <br />
              <br />
              {success ? (
                <h3 style={{ color: "blue" }}>
                  Symulacja przebiegła pomyślnie, przejdź do zakładki Result
                </h3>
              ) : null}
              <Button
                variant="contained"
                color="primary"
                className="submit"
                onClick={() =>
                  simulate(
                    time,
                    step,
                    calculationArr,
                    setResultArr,
                    setStandardResultArr,
                    setError,
                    handlePageObj,
                    setSuccess
                  )
                }
              >
                Symulacja
              </Button>
            </SimulationDataContainer>
          ) : (
            <>
              <div>
                {validationError.error ? (
                  <p>{validationError.message}</p>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      className="submit"
                      onClick={() => addNewSet()}
                    >
                      Nowy set
                    </Button>
                  </>
                )}

                {/* localSet jest tablicą setów (simulation set) => set jest tablicą Tanków => tank to obiekt o właściwościach: tankId, mass, volume, in (tablica strumieni wejściowych), out (talica strumieni wyjściowych)
      obiekty w tablicy "in" mają własciwości: fluxName i fluxValue
      obiekty w tablicy "out" mają własciwości: fluxName, fluxValue oraz tankIdInMassArr (który określa ID masy w tablicy mas potrzebnych do obliczeń)
    */}
                {calculationArr
                  ? calculationArr.map((set, indexOfSet) => {
                      if (indexOfSet === 0) {
                        return (
                          <InfoSetContainer key={indexOfSet}>
                            <h1>Symulacja nr {indexOfSet} (model)</h1>
                            {set.map((tank, tankIndex) => (
                              <div key={tankIndex}>
                                <h2>Tank {tankIndex + 1}</h2>m
                                <sub>{tankIndex + 1}</sub> = {tank.mass} [kg]
                                <br />V<sub>{tankIndex + 1}</sub> ={" "}
                                {tank.volume} [m<sup>3</sup>]<h3>Flux</h3>
                                {tank.out.map((outObj) => (
                                  <>
                                    F<sub>{outObj.fluxName}</sub> ={" "}
                                    {outObj.fluxValue} [m<sup>3</sup>/s]
                                  </>
                                ))}
                              </div>
                            ))}
                          </InfoSetContainer>
                        );
                      } else {
                        return (
                          <InfoSetContainer key={indexOfSet}>
                            <h1>Symulacja nr {indexOfSet}</h1>
                            {set.map((tank, tankIndex) => (
                              <div key={tankIndex}>
                                <h2>Tank {tankIndex + 1}</h2>
                                <label>
                                  m<sub>{tankIndex + 1}</sub>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      handleChangeMassAndVolume(
                                        e,
                                        indexOfSet,
                                        tankIndex,
                                        "mass"
                                      )
                                    }
                                  />
                                </label>
                                <br />
                                <label>
                                  V<sub>{tankIndex + 1}</sub>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      handleChangeMassAndVolume(
                                        e,
                                        indexOfSet,
                                        tankIndex,
                                        "volume"
                                      )
                                    }
                                  />
                                </label>
                                <h1>Flux out</h1>
                                {tank.out.map((flux, index) => (
                                  <label key={index}>
                                    F<sub>{flux.fluxName}</sub>
                                    <input
                                      type="text"
                                      onChange={(e) =>
                                        handleChangeFlux(
                                          e,
                                          indexOfSet,
                                          tankIndex,
                                          flux.fluxName
                                        )
                                      }
                                    />
                                  </label>
                                ))}
                                <br />
                              </div>
                            ))}
                            <p
                              style={{
                                color: `${
                                  validationArray[indexOfSet] ? "blue" : "red"
                                }`,
                              }}
                            >
                              Validation:
                              {validationArray[indexOfSet]
                                ? "correct"
                                : "false"}
                            </p>
                          </InfoSetContainer>
                        );
                      }
                    })
                  : null}
              </div>
              <div>
                <p>
                  Aby zweryfikować i zatwierdzić symulacje, wciśnij przycisk
                  poniżej
                </p>

                <h2 style={{ color: "red" }}>{pageObj[1].message}</h2>
                <Button
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={() => verify()}
                >
                  Walidacja
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </SimulationContainer>
  );
};

export default ClosedSimulation;
