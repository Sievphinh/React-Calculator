import React from "react";
import "./Keypad.css";

const Keypad = ({ className, onClick, value }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
};
export default Keypad;
