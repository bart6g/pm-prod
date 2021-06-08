exports.calculate = (set, time, dt) => {
  // console.log(set);
  let howMuch = 0;
  const tempSet = set.filter((el) => el.id !== "255" && el.id !== "277");
  let massArr = [];
  let volumeArr = [];
  tempSet.forEach((tank) => {
    massArr.push(parseFloat(tank.mass));
    volumeArr.push(parseFloat(tank.volume));
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
    howMuch++;
  }

  const concentrationResult = [];
  const standardConcentrationResult = [];
  concentrationResult.push([0, ...actualConct]);
  standardConcentrationResult.push([0, ...actualStandardConct]);
  const steps = time / dt;

  for (let i = 1; i < steps + 1; i++) {
    howMuch++;
    let tempMassResult = [];
    let tempMass = [];
    let tempConcentration = [];
    let tempStandardConcentration = [];
    tempMassResult[0] = parseFloat((dt * i).toFixed(1));
    tempConcentration[0] = parseFloat((dt * i).toFixed(1));
    tempStandardConcentration[0] = parseFloat((dt * i).toFixed(1));
    let rowLength = massResult[0].length;
    for (let j = 1; j < rowLength; j++) {
      howMuch++;
      // console.log("massResult[i-1][j]", massResult[i - 1][j]);
      let inArrLength = tempSet[j - 1].in.length;
      // console.log("inArr", inArrLength, "set[j - 1].in", tempSet[j - 1].in);
      let outArrLength = tempSet[j - 1].out.length;
      // console.log("out", tempSet[j - 1].in);
      // console.log("out", outArrLength, "set[j - 1].out", tempSet[j - 1].out);
      let massIn = 0;
      let massOut = 0;

      for (let n = 0; n < outArrLength; n++) {
        howMuch++;

        massOut =
          (massResult[i - 1][j] *
            parseFloat(tempSet[j - 1].out[n].fluxValue) *
            dt) /
            volumeArr[j - 1] || 0;
        // console.log("massOut sum", massOut);
        tempMass.push(-massOut);
      }

      for (let m = 0; m < inArrLength; m++) {
        howMuch++;

        massIn =
          (massResult[i - 1][parseInt(tempSet[j - 1].in[m].source)] *
            parseFloat(tempSet[j - 1].in[m].fluxValue) *
            dt) /
            volumeArr[parseInt(tempSet[j - 1].in[m].source) - 1] || 0;

        tempMass.push(massIn);
      }

      let actMass = massResult[i - 1][j] + tempMass.reduce((a, b) => a + b);

      let concentration = actMass / volumeArr[j - 1];
      let standardConcentration =
        (concentration * standardVolume) / standardMass;

      tempMass = [];
      massIn = 0;
      massOut = 0;
      tempMassResult[j] = actMass;
      tempConcentration[j] = concentration;
      tempStandardConcentration[j] = standardConcentration;
    }
    massResult.push(tempMassResult);
    concentrationResult.push(tempConcentration);
    standardConcentrationResult.push(tempStandardConcentration);
    tempMassResult = [];
    tempConcentration = [];
    tempStandardConcentration = [];
  }

  console.log(howMuch);
  return [concentrationResult, standardConcentrationResult];
};
