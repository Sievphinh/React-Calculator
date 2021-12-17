import React from "react";
import { Textfit } from "@outofaxis/react-textfit";
import "./Display.css";
const Display = ({ value }) => {
  return (
    <Textfit className="display" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Display;
