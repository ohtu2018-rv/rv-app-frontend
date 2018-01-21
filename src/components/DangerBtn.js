import React, { Component } from "react";
import "./../buttons.css";

const DangerBtn = ({ onClick, text, fill }) => {
  return (
    <button
      onClick={onClick}
      className={fill ? "btn danger-fill" : "btn danger"}
    >
      {text}
    </button>
  );
};

export default DangerBtn;
