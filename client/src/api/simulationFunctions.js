import axios from "axios";

const calculate = (set, time, dt) => {
  // console.log(set);

  let massArr = [];
  let volumeArr = [];
  set.forEach((tank) => {
    massArr.push(tank.mass);
    volumeArr.push(tank.volume);
  });
  let standardMass = massArr.reduce((a, b) => a + b);
  let standardVolume = volumeArr.reduce((a, b) => a + b);
  let massResult = [];
  let actualConct = [];
  let actualStandardConct = [];
  massResult.push([0, ...massArr]);

  for (let i = 0; i < massArr.length; i++) {
    let temp = massArr[i] / volumeArr[i];
    let tempStandard =
      ((massArr[i] / volumeArr[i]) * standardVolume) / standardMass;
    actualConct.push(temp);
    actualStandardConct.push(tempStandard);
  }

  const concentrationResult = [];
  const standardConcentrationResult = [];
  concentrationResult.push([0, ...actualConct]);
  standardConcentrationResult.push([0, ...actualStandardConct]);
  const steps = time / dt;

  for (let i = 1; i < steps + 1; i++) {
    let tempMassResult = [];
    let tempMass = [];
    let tempConcentration = [];
    let tempStandardConcentration = [];
    tempMassResult[0] = parseFloat((dt * i).toFixed(1));
    tempConcentration[0] = parseFloat((dt * i).toFixed(1));
    tempStandardConcentration[0] = parseFloat((dt * i).toFixed(1));
    let rowLength = massResult[0].length;
    for (let j = 1; j < rowLength; j++) {
      // console.log("massResult[i-1][j]", massResult[i - 1][j]);
      let inArrLength = set[j - 1].in.length;
      // console.log("inArr", inArrLength, "set[j - 1].in", set[j - 1].in);
      let outArrLength = set[j - 1].out.length;
      // console.log("out", set[j - 1].in);
      // console.log("out", outArrLength, "set[j - 1].out", set[j - 1].out);
      let massIn = 0;
      let massOut = 0;

      for (let n = 0; n < outArrLength; n++) {
        // console.log("mass", massResult[i - 1][j]);
        // console.log("setout", set[j - 1].out[n].fluxValue);
        // console.log("volume", volumeArr[j - 1]);
        // console.log("dt", dt);
        massOut =
          (massResult[i - 1][j] * set[j - 1].out[n].fluxValue * dt) /
          volumeArr[j - 1];
        // console.log("massOut", massOut);
        tempMass.push(-massOut);
      }

      for (let m = 0; m < inArrLength; m++) {
        // console.log("index", set[j - 1].in[m].source);
        // console.log(
        //   "mass",
        //   massResult[i - 1][parseInt(set[j - 1].in[m].source)]
        // );
        // console.log("setout", set[j - 1].in[m].fluxValue);
        // console.log("volume", volumeArr[parseInt(set[j - 1].in[m].source) - 1]);
        // console.log("dt", dt);

        massIn =
          (massResult[i - 1][parseInt(set[j - 1].in[m].source)] *
            set[j - 1].in[m].fluxValue *
            dt) /
          volumeArr[parseInt(set[j - 1].in[m].source) - 1];
        // console.log("massIn", massIn);
        tempMass.push(massIn);
      }
      let actMass = massResult[i - 1][j] + tempMass.reduce((a, b) => a + b);
      let concentration = actMass / volumeArr[j - 1];
      let standardConcentration =
        (concentration * standardVolume) / standardMass;
      // console.log("actmass", actMass);
      tempMass = [];
      massIn = 0;
      massOut = 0;
      tempMassResult[j] = actMass;
      tempConcentration[j] = concentration;
      tempStandardConcentration[j] = standardConcentration;
      // console.log("tempmassresult", tempMassResult);
    }
    massResult.push(tempMassResult);
    concentrationResult.push(tempConcentration);
    standardConcentrationResult.push(tempStandardConcentration);
    tempMassResult = [];
    tempConcentration = [];
    tempStandardConcentration = [];
  }

  return [concentrationResult, standardConcentrationResult];
};

export const simulate = (
  tcalc,
  dt,
  calculationArr,
  setResultArr,
  setStandardResultArr,
  setError,
  handlePageObj,
  setSuccess
) => {
  if (!tcalc || !dt) {
    setError(true);
    handlePageObj("result", true, "success");
  } else {
    handlePageObj("result", true, "success");
    const tempArr = [];
    const standardTempArr = [];
    calculationArr.forEach((set) => {
      // let tempResult = calculate(set, tcalc, dt);
      let tempResult = axios
        .post("http://localhost:5000/simulate", {
          set: set,
          tcalc: tcalc,
          dt: dt,
        })
        .then((data) => {
          tempArr.push(data.data[0]);
          standardTempArr.push(data.data[1]);
        });
    });

    setError(false);
    setResultArr(tempArr);
    setStandardResultArr(standardTempArr);
    setSuccess(true);
  }
};
