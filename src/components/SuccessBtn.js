import React, { Component } from "react";
import "./../buttons.css";

const SuccessBtn = ({ onClick, text, fill }) => {
  return (
    <button
      onClick={onClick}
      className={fill ? "btn success-fill" : "btn success"}
    >
      {text}
    </button>
  );
};

export default SuccessBtn;
