import React, { useState, useEffect, useContext } from "react";
import { Handle } from "react-flow-renderer";

import { AiOutlineArrowRight } from "react-icons/ai";
import { TankContext } from "../../../context/tankContext";

const TankNode = ({ data, id }) => {
  const { stateArr, setStateArr, openFlux, setOpenFlux } =
    useContext(TankContext);
  const [tankState, setTankState] = useState(null);

  useEffect(() => {
    // console.log("changed", id);
    const actualStateArr = [...stateArr];
    const tankIndex = actualStateArr.findIndex((tank) => tank.id === id);
    setTankState(actualStateArr[tankIndex]);
  }, [stateArr]);

  const handleMassOrVolumeChange = (e, toChange) => {
    const prevState = { ...tankState };
    prevState[toChange] = parseFloat(e.target.value.replace(/,/, "."));
    setTankState(prevState);

    const actualArr = [...stateArr];
    const tankIndex = actualArr.findIndex((el) => el.id === id);
    if (tankIndex === -1) {
      actualArr.push(prevState);
    } else {
      actualArr[tankIndex] = prevState;
    }
    setStateArr(actualArr);
    console.log(stateArr);
  };

  const handleFluxChange = (e, flux) => {
    const prevState = { ...tankState };
    prevState.out.forEach((outObj) =>
      outObj.fluxName === flux.fluxName
        ? (outObj.fluxValue = parseFloat(e.target.value.replace(/,/, ".")))
        : outObj
    );
    setTankState(prevState);

    const actualArr = [...stateArr];
    const tankIndex = actualArr.findIndex((el) => el.id === flux.hasTarget);

    actualArr.forEach((tank, index) =>
      index === tankIndex
        ? tank.in.forEach((inObj) =>
            inObj.source === id
              ? (inObj.fluxValue = parseFloat(e.target.value.replace(/,/, ".")))
              : inObj
          )
        : tank
    );

    setStateArr(actualArr);
  };

  return (
    <div className="tank" key={id}>
      {data.isOpen ? (
        id === "255" ? (
          <>
            <Handle
              type="source"
              position="right"
              style={{
                background: "white",
                border: "2px solid black",
                width: "15px",
                height: "15px",
                transform: "translate(50%, -50%)",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              <AiOutlineArrowRight style={{ pointerEvents: "none" }} />
            </Handle>
            <h4>wejście</h4>

            <label>
              F<sub>w</sub>
              <input
                type="text"
                // onChange={(e) => {
                //   setOpenFlux(parseFloat(e.target.value));
                //   console.log(openFlux);
                // }}
                onChange={(e) => handleFluxChange(e, data.connections[0])}
              />
            </label>
          </>
        ) : (
          <>
            <h4>wyjście</h4>

            <Handle
              type="target"
              position="left"
              style={{
                background: "black",
                border: "2px solid black",
                width: "15px",
                height: "15px",
                transform: "translate(-50%, -50%)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              <AiOutlineArrowRight style={{ pointerEvents: "none" }} />
            </Handle>
          </>
        )
      ) : (
        <>
          <Handle
            type="target"
            position="left"
            style={{
              background: "black",
              border: "2px solid black",
              width: "15px",
              height: "15px",
              transform: "translate(-50%, -50%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            <AiOutlineArrowRight style={{ pointerEvents: "none" }} />
          </Handle>
          <div>TankID: {id}</div>
          <div>{data.label}</div>
          <br />
          {/* <button onClick={() => console.log(tankState)}>state</button> */}
          <form>
            <label>
              m<sub>{id}</sub>(t=0)
              <input
                type="number"
                onChange={(e) => handleMassOrVolumeChange(e, "mass")}
              />
            </label>

            <label>
              V<sub>{id}</sub>
              <input
                type="number"
                onChange={(e) => handleMassOrVolumeChange(e, "volume")}
              />
            </label>
            {data.connections
              ? data.connections.map((target) => {
                  if (target.hasTarget !== "277") {
                    return (
                      <label key={target.fluxName}>
                        F<sub>{target.fluxName}</sub>
                        <input
                          key={target.fluxName}
                          type="number"
                          onChange={(e) => handleFluxChange(e, target)}
                        />
                      </label>
                    );
                  }
                })
              : null}
            {data.connections
              ? data.connections.map((target) => {
                  if (target.hasTarget === "277") {
                    return (
                      <label key={target.fluxName}>
                        F<sub>w</sub>
                        <input
                          key={target.fluxName}
                          type="number"
                          onChange={(e) => handleFluxChange(e, target)}
                        />
                      </label>
                    );
                  }
                })
              : null}
          </form>
          <Handle
            type="source"
            position="right"
            style={{
              background: "white",
              border: "2px solid black",
              width: "15px",
              height: "15px",
              transform: "translate(50%, -50%)",
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            <AiOutlineArrowRight style={{ pointerEvents: "none" }} />
          </Handle>
        </>
      )}
    </div>
  );
};

export default TankNode;
