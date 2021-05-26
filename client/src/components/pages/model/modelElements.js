import styled from "styled-components";

export const ModelContainer = styled.div`
  display: flex;
`;

export const ModelLearnContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? "300px" : "50px")};
  background-color: ${({ isOpen }) => (isOpen ? "white" : "transparent")};
  padding: 10px 10px;
  padding-top: 50px;
  height: calc(100vh - 80px);
  ol {
    margin: 0 20px;
  }

  position: relative;
  transition: all 0.5s ease;
  svg {
    position: absolute;
    top: 20px;
    right: ${({ isOpen }) => (isOpen ? "20px" : "12.5px")};
    width: 30px;
    height: 30px;
    transform: ${({ isOpen }) => (isOpen ? "" : "rotate(180deg)")};
    transition: all 0.5s ease;
  }
`;
export const ModelRadio = styled.div`
  /* display: flex; */
  /* width: calc(100% - 300px); */
  margin-left: 10px;
  flex-direction: column;
  justify-content: flex-end;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  margin: 20px 0;
`;

export const ModelInfo = styled.div`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
