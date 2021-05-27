import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { HomeContainer } from "./homeElements";
import ModelRH from "./ModelRH";
import ModelOtwarty from "./ModelOtwarty";

const AfterLogin = () => {
  const [type, setType] = useState("model RH");
  return (
    <HomeContainer>
      Witaj w aplikacji TankAPP. Poniżej możesz wybrać poradnik
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <FormControlLabel
          value="model RH"
          control={<Radio />}
          label="Model RH"
        />
        <FormControlLabel
          value="model otwarty"
          control={<Radio />}
          label="Model otwarty"
        />
      </RadioGroup>
      {type === "model RH" ? <ModelRH /> : <ModelOtwarty />}
    </HomeContainer>
  );
};

export default AfterLogin;
