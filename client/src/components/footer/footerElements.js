import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 80px;
  background-color: #a9cbec;
`;

export const FooterContent = styled.div`
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
  p {
    width: 50%;
    padding: 0 20px;
    text-align: justify;
  }
  span {
    font-weight: 700;
    padding-right: 10px;
  }
`;
