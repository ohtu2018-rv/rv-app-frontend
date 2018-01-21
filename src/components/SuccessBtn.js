import React, { Component } from "react";
import "./../buttons.css";

const SuccessBtn = ({ onClick, children, fill }) => {
  return (
    <button
      onClick={onClick}
      className={fill ? "btn success-fill" : "btn success"}
    >
      {children}
    </button>
  );
};

export default SuccessBtn;
