import React, { useState, useContext, useEffect } from "react";
import Chart from "./Chart";
import InfoSet from "./InfoSet";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { SwitchButton } from "./resultElements";
const Single = ({ indexSet, set, result, standardResult }) => {
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [isStandard, setIsStandard] = useState(false);

  const handleCheckbockChange = (e, value) => {
    const { checked } = e.target;

    const states = [...checkboxStates];

    const indexOfCheckBox = states.findIndex((el) => el.value === value);

    if (indexOfCheckBox !== -1) {
      states[indexOfCheckBox].visible = checked;
    }

    setCheckboxStates(states);
  };
  useEffect(() => {
    const states = [];
    const tempSet = set.filter((el) => el.id !== "255" && el.id !== "277");
    for (let i = 0; i < tempSet.length; i++) {
      states.push({ value: i + 1, visible: i === 0 ? true : false });
    }
    setCheckboxStates(states);
  }, []);

  let buttons = checkboxStates.map((state) => {
    return (
      // <label key={state.value}>
      //   <input
      //     type="checkbox"
      //     name="name"
      //     onChange={(e) => handleCheckbockChange(e, state.value)} //modifed by using value, so dont need to add +1
      //   />
      //   c{state.value}(t)
      // </label>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.visible}
            onChange={(e) => handleCheckbockChange(e, state.value)}
            name="checkedF"
          />
        }
        label={` c${state.value}(t)`}
      />
    );
  });
  return (
    <>
      <InfoSet indexSet={indexSet} set={set} />
      <div>
        {/* <button onClick={() => console.log(checkboxStates)}>set</button> */}
        <p>
          Aby zmienić dane obliczeniowe z rzeczywistych na standardowe, wciśnij
          poniższy przycisk
        </p>
        <br />
        <SwitchButton
          onClick={() => setIsStandard(!isStandard)}
          isStandard={isStandard}
        >
          {isStandard ? (
            <h3 className="standard">Standardowe</h3>
          ) : (
            <h3 className="real">Rzeczywiste</h3>
          )}
          <span className="toggle"></span>
        </SwitchButton>
        <br />
        <FormGroup row>{buttons}</FormGroup>

        {isStandard ? (
          <Chart index={checkboxStates} result={standardResult} />
        ) : (
          // <button onClick={() => console.log(standardResult)}>Standard</button>
          <Chart index={checkboxStates} result={result} />
          // <button onClick={() => console.log(result)}>Result</button>
        )}
      </div>
    </>
  );
};

export default Single;
