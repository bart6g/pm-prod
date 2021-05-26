import React from "react";
import { NavContainer, NavLinks, NavWrapper } from "./navElements";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/userActions";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Navbar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    history.push("/");
  };
  return (
    <NavContainer>
      <NavWrapper>
        <NavLinks>
          <li>
            <NavLink to="/" exact>
              Strona główna
            </NavLink>
          </li>
          <li>
            <NavLink to="/model" exact>
              Model
            </NavLink>
          </li>
          <li>
            <NavLink to="/simulation" exact>
              Symulacja
            </NavLink>
          </li>
          <li>
            <NavLink to="/result" exact>
              Wyniki
            </NavLink>
          </li>
        </NavLinks>
        <Button variant="contained" onClick={() => handleLogout()}>
          Wyloguj się
        </Button>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;
