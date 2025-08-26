import React from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useLanguage } from "../context/LanguageProvider";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/mainStyles.css'



export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const toggleStyle = {
    backgroundColor: "#212529",
    color: "white",
    fontSize: "0.8rem",
    padding: "0.25rem 0.5rem",
  };

  return (
    <Dropdown as={ButtonGroup} className="language-dropdown">
      <Dropdown.Toggle style={toggleStyle}>
        <FontAwesomeIcon icon={faGlobe} size="sm" color="white" />
        &nbsp;
        {language === "es" ? "Es" : "En"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={language === "es"}
          onClick={() => changeLanguage("es")}
        >
          Es
        </Dropdown.Item>
        <Dropdown.Item
          active={language === "en"}
          onClick={() => changeLanguage("en")}
        >
          En
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}