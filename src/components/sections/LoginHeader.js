import React from "react";
import TkoAlyLogo from "../logos/TkoAlyLogo";
import "./styles/LoginHeader.css";

const LoginHeader = props => (
  <div className="loginHeader">
    <TkoAlyLogo />
    <h1>Ruokavälitys</h1>
  </div>
);

export default LoginHeader;
