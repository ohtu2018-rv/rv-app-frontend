import React, { Component } from "react";
import "./../buttons.css";

const DangerBtn = ({ onClick, children, fill }) => {
  return (
    <button
      onClick={onClick}
      className={fill ? "btn danger-fill" : "btn danger"}
    >
      {children}
    </button>
  );
};

export default DangerBtn;
