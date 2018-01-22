import React, { Component } from "react";
import "./styles/Button.css";
import "./styles/SuccessBtn.css";

const SuccessBtn = ({ onClick, children, fill, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={fill ? "btn success-fill" : "btn success"}
    >
      {children}
    </button>
  );
};

export default SuccessBtn;
