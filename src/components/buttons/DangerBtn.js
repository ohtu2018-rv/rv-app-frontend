import React, { Component } from "react";
import "./styles/Button.css";
import "./styles/DangerBtn.css";

const DangerBtn = ({ onClick, children, fill, ...props }) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={fill ? "btn danger-fill" : "btn danger"}
    >
      {children}
    </button>
  );
};

export default DangerBtn;
