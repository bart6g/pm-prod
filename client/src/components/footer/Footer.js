import React from "react";
import { FooterContainer, FooterContent } from "./footerElements";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <h3>&copy; Bartosz Gałuszka, 2021.</h3>
        <p>
          <span>Praca magisterska:</span>
          Opracowanie aplikacji internetowej do modelowania procesu mieszania
          kąpieli metalowej opartej o teorię reaktorów elementarnych{" "}
        </p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
