import React from "react";
import "./styles/Button.css";
import "./styles/BasicBtn.css";
import Loader from "./../loaders/Loader";

const SuccessBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
  let className = "btn";
  fill ? (className += " basic-fill") : (className += " basic");
  hover &&
    (fill ? (className += " basic-fill-hover") : (className += " basic-hover"));

  return (
    <button {...props} onClick={onClick} className={className}>
      {!loader ? <span className="btnContent">{children}</span> : <Loader />}
    </button>
  );
};

export default SuccessBtn;
