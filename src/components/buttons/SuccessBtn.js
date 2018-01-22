import React from "react";
import "./styles/Button.css";
import "./styles/SuccessBtn.css";
import Loader from "./../loaders/Loader";

const SuccessBtn = ({ onClick, children, fill, hover, loader, ...props }) => {
  let className = "btn";
  fill ? (className += " success-fill") : (className += " success");
  hover &&
    (fill
      ? (className += " success-fill-hover")
      : (className += " success-hover"));

  return (
    <button {...props} onClick={onClick} className={className}>
      {!loader ? <span className="btnContent">{children}</span> : <Loader />}
    </button>
  );
};

export default SuccessBtn;
