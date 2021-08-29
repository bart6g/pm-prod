import React, { useState, useContext } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Controls,
  Background,
} from "react-flow-renderer";
import { TankContext } from "../../../context/tankContext";
import TankNode from "./TankNode";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const nodeTypes = {
  tankNode: TankNode,
};

const OpenFlow = () => {
  const {
    appElements,
    setAppElements,
    tanks,
    setTanks,
    stateArr,
    setStateArr,
    setCalculationArr,
    handlePageObj,
    rynnowy,
  } = useContext(TankContext);

  const [tankName, setTankName] = useState("");
  const [tankId, setTankId] = useState(1);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  const addNode = () => {
    const newTank = {
      id: `${tankId}`,
      data: {
        label: `${tankName}`,
        isOpen: false,
        connections: [],
        in: [],
        out: [],
      },
      position: {
        x: 0,
        y: 0,
      },
      type: "tankNode",
    };

    const newTankState = {
      id: `${tankId}`,
      label: `${tankName}`,
      mass: 0,
      volume: 0,
      in: [],
      out: [],
    };
    const actualStateArr = [...stateArr];
    const index = actualStateArr.findIndex(
      (el) => el.id === `${tanks.length + 1}`
    );
    if (index === -1) {
      actualStateArr.push(newTankState);
      setStateArr(actualStateArr);
      setTanks((prev) => prev.concat(newTank));
      setAppElements((prev) => prev.concat(newTank));
      setTankId((prev) => prev + 1);
    }
  };

  const addConnectionsToNode = (source, target) => {
    console.log("im here 2");
    const actualElements = [...appElements];
    const actualStateArr = [...stateArr];
    const sourceIndex = appElements.findIndex((el) => el.id === source);
    const targetIndex = appElements.findIndex((el) => el.id === target);
    let flux = `${source}${target}`;
    const targetElement = {
      hasTarget: target,
      fluxName: flux,
    };

    const outFlux = {
      target,
      fluxName: flux,
      fluxValue: 0,
    };

    const inFlux = {
      source,
      fluxName: flux,
      fluxValue: 0,
    };

    const isConnection = actualElements[sourceIndex].data.connections.findIndex(
      (el) => el.hasTarget === target && el.fluxName === flux
    );
    if (isConnection === -1) {
      console.log("adding fluxes");
      actualElements[sourceIndex].data.connections.push(targetElement);
      actualElements[sourceIndex].data.out.push(outFlux);
      actualElements[targetIndex].data.in.push(inFlux);
      actualStateArr.forEach((tank) => {
        if (tank.id === source) {
          tank.out.push(outFlux);
        }
      });
      actualStateArr.forEach((tank) => {
        if (tank.id === target) {
          tank.in.push(inFlux);
        }
      });
    }
    setAppElements(actualElements);
    setStateArr(actualStateArr);
  };
  const onConnect = (params) => {
    const myParams = { ...params };
    myParams["arrowHeadType"] = "arrowclosed";
    myParams["type"] = "step";
    myParams["animated"] = "true";
    myParams["borderRadius"] = "90";
    myParams["style"] = { stroke: "black" };
    addConnectionsToNode(params.source, params.target);
    setAppElements((els) => addEdge(myParams, els));
  };

  // TUTAJ DODAĆ KOLEJNE ELEMENTY USUWANIA
  const onElementsRemove = (elementsToRemove) => {
    setAppElements((els) => removeElements(elementsToRemove, els));
  };

  const validation = () => {
    const actualStateArr = [...stateArr].filter(
      (tank) => tank.id !== "255" && tank.id !== "277"
    );
    const fluxArr = [];
    actualStateArr.forEach((tank) => {
      let tempArr = [];
      tank.in.forEach((inObj) => tempArr.push(-inObj.fluxValue));
      tank.out.forEach((outObj) => tempArr.push(outObj.fluxValue));
      fluxArr.push(tempArr.reduce((a, b) => a + b));
    });
    const validationArray = fluxArr.map((el) =>
      el === 0 || (el < 1e-8 && el > 0) || (el > -1e-8 && el < 0) ? 0 : 1
    );
    const validation = validationArray.reduce((a, b) => a + b);

    console.log(validation);

    if (validation === 0) {
      //validation true
      let message =
        "Validation successfull, you will be pushed to simulation page, where you can add additional simulations";
      let tempCalc = [];
      tempCalc.push(stateArr);
      setCalculationArr(tempCalc);
      alert(message);
      handlePageObj("model", true, message);
    } else {
      // validation failed
      let message = "Validation failed, please check fluxes in all the tanks";
      console.log(message);
      alert(message);
      handlePageObj("model", false, message);
      return false;
    }
  };
  return (
    <>
      <div>
        <div className="flow-form">
          <TextField
            id="outlined-basic"
            label="Nazwa podobszaru (opcjonalnie)"
            variant="outlined"
            className="login"
            style={{ width: "350px" }}
            onChange={(e) => setTankName(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className="submit"
            onClick={() => addNode()}
          >
            Dodaj
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="submit"
            onClick={() => validation(rynnowy)}
          >
            Sprawdź i zatwierdź
          </Button>
        </div>

        <ReactFlow
          elements={appElements}
          onLoad={onLoad}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onElementsRemove={onElementsRemove}
          edgeTypes={{ arrowHeadType: "arrow" }}
          style={{ height: "800px", width: "calc(100vw - 300px)" }}
        >
          <Controls />
          <Background variant="dots" gap={10} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};

export default OpenFlow;
