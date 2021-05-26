import styled from "styled-components";

export const NavContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #1976d2;
`;

export const NavWrapper = styled.div`
  max-width: 1350px;
  height: 100%;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLinks = styled.ul`
  display: flex;
  margin-right: 30px;
  li {
    list-style: none;
  }
  a {
    display: block;
    text-decoration: none;
    color: white;
    padding: 10px 20px;
  }
`;
