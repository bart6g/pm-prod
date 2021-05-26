import React from "react";
import styled from "styled-components";

export const InfoSetContainer = styled.div`
  max-width: 800px;

  height: 100%;
  padding: 20px;
  background-color: white;
  margin: 20px 0;
  box-shadow: rgb(212 217 232 / 20%) 0px 30px 40px 0px;

  div {
    border: 1px solid gray;
    margin: 10px 0px;
    padding: 10px;
  }
  label {
    /* display: flex; */
    flex-direction: column;
    max-width: 300px;
    input:first-child {
      margin-bottom: 0;
    }
    input {
      padding: 3px;
      margin-left: 10px;
      margin-bottom: 15px;
    }
  }
`;
const InfoSet = ({ set, indexSet }) => {
  return (
    <InfoSetContainer>
      {set ? (
        <>
          <h2>Symulacja nr {indexSet}</h2>
          {set.map((tank, tankIndex) => (
            <div key={tankIndex}>
              {tank.id === "255" || tank.id === "277" ? (
                tank.id === "255" ? (
                  <>
                    <p>
                      F<sub>w</sub> = {tank.out[0].fluxValue}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      F<sub>w</sub> = {tank.in[0].fluxValue}
                    </p>
                  </>
                )
              ) : (
                <>
                  <h2>Tank {tank.id}</h2>m<sub>{tank.id}</sub>(t=0) ={" "}
                  {tank.mass} [kg]
                  <br />V<sub>{tank.id}</sub> = {tank.volume} [m3]
                  <h4>Flux out</h4>
                  {tank.out.map((outObj) => (
                    <>
                      {outObj.target === "277" ? (
                        <aside>
                          F<sub>w</sub> = {outObj.fluxValue} [m3/s]
                        </aside>
                      ) : (
                        <aside>
                          F<sub>{outObj.fluxName}</sub> = {outObj.fluxValue}{" "}
                          [m3/s]
                        </aside>
                      )}
                    </>
                  ))}
                </>
              )}
            </div>
          ))}
        </>
      ) : null}
    </InfoSetContainer>
  );
};

export default InfoSet;
