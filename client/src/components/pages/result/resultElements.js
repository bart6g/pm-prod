import styled from "styled-components";

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1350px;
  margin: 0 auto;
  padding: 30px;
`;

export const SwitchButton = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 50px;
  outline: none;
  border: 2px solid #f50057;
  display: flex;
  align-items: center;
  position: relative;

  .real {
    position: absolute;
    left: 20px;
  }
  .standard {
    position: absolute;
    left: 85px;
  }
  .toggle {
    position: absolute;
    display: block;
    width: 75px;
    height: 34px;
    left: ${({ isStandard }) => (isStandard ? "2px" : "120px")};
    background-color: #f50057;
    border-radius: 50px;
    transition: all 0.3s ease;
    /* left: 120px; */
  }
`;
