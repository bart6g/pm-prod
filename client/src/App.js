import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer } from "./components/common/commonElements";
import Footer from "./components/footer/Footer";
import Navbar from "./components/nav/Navbar";
import Home from "./components/pages/home/Home";
import Model from "./components/pages/model/Model";
import Result from "./components/pages/result/Result";
import Simulation from "./components/pages/simulation/Simulation";
import { TankContext } from "./context/tankContext";
const App = () => {
  const { loggedIn } = useSelector((state) => state.userData);

  const [appElements, setAppElements] = useState([]);
  const [tanks, setTanks] = useState([]);
  const [stateArr, setStateArr] = useState([]);
  const [calculationArr, setCalculationArr] = useState([]);
  const [tcalc, setTcalc] = useState(0);
  const [dt, setDt] = useState(0);
  const [reactorType, setReactorType] = useState("close");
  const [resultArr, setResultArr] = useState([]);
  const [standardResultArr, setStandardResultArr] = useState([]);
  const [validationError, setValidationError] = useState({
    error: false,
    message: "",
  });
  const [openFlux, setOpenFlux] = useState(null);
  //validation array to tablica booleanów, elementowi i odpowiada true (poprawny) false (niepoprawny) dla i-tego seta w calculationArr
  const [validationArray, setValidationArray] = useState([]);
  const [pageObj, setPageObj] = useState([
    {
      page: "model",
      validation: false,
      message: "",
    },
    {
      page: "simulation",
      validation: false,
      message: "",
    },
    {
      page: "result",
    },
  ]);

  const handleCleanState = (arr, stateArr = []) => {
    setAppElements(arr);
    setTanks(arr);
    setStateArr(stateArr);
    setTcalc([]);
    setDt([]);
    setResultArr([]);
    setStandardResultArr([]);
    setValidationArray([]);
  };

  const handleCleanEverything = () => {
    setAppElements([]);
    setTanks([]);
    setStateArr([]);
    setTcalc([]);
    setDt([]);
    setResultArr([]);
    setCalculationArr([]);
    setStandardResultArr([]);
    setValidationArray([]);
    setOpenFlux(null);
    setReactorType("close");
    setPageObj([
      {
        page: "model",
        validation: false,
        message: "",
      },
      {
        page: "simulation",
        validation: false,
        message: "",
      },
      {
        page: "result",
        result: false,
      },
    ]);
  };

  const handlePageObj = (page, validation, message) => {
    console.log(page, validation, message);
    const actualPageObj = [...pageObj];
    const pageIndex = actualPageObj.findIndex((el) => el.page === page);
    actualPageObj[pageIndex] = {
      page: page,
      validation: validation,
      message: message,
    };
    setPageObj(actualPageObj);
  };

  return (
    <Router>
      {loggedIn ? <Navbar /> : null}
      <TankContext.Provider
        value={{
          appElements,
          setAppElements,
          calculationArr,
          setCalculationArr,
          tcalc,
          setTcalc,
          dt,
          setDt,
          resultArr,
          setResultArr,
          tanks,
          setTanks,
          stateArr,
          setStateArr,
          validationError,
          setValidationError,
          validationArray,
          setValidationArray,
          pageObj,
          setPageObj,
          handlePageObj,
          standardResultArr,
          setStandardResultArr,
          handleCleanState,
          reactorType,
          setReactorType,
          openFlux,
          setOpenFlux,
          handleCleanEverything,
        }}
      >
        <AppContainer>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/model" exact component={Model} />
            <Route path="/simulation" exact component={Simulation} />
            <Route path="/result" exact component={Result} />
          </Switch>
        </AppContainer>
        <Footer />
      </TankContext.Provider>
    </Router>
  );
};

export default App;
