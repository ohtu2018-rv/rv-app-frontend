import React from "react";
import "./styles/LoginForm.css";

import SuccessBtn from "./../buttons/SuccessBtn";

const LoginForm = ({
  handleInputEvent,
  handleSubmit,
  handleKeyUp,
  username,
  password,
  loader,
  shadow,
  usernameDisabled,
  passwordDisabled,
  submitDisabled
}) => {
  return (
    <div className={shadow ? "form form-shadow loginForm" : "form loginForm"}>
      <form onSubmit={handleSubmit}>
        <legend>Ruokavälitys</legend>
        <div className="formControl">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Käyttäjätunnus"
            value={username}
            onChange={handleInputEvent}
            onKeyDown={handleKeyUp}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="input"
            disabled={usernameDisabled}
          />
        </div>
        <div className="formControl">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Salasana"
            value={password}
            onChange={handleInputEvent}
            onKeyDown={handleKeyUp}
            className="input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            disabled={passwordDisabled}
          />
        </div>
        <div className="formControl">
          <SuccessBtn
            fill={true}
            loader={loader}
            disabled={submitDisabled}
            style={{ width: "100%" }}
          >
            Kirjaudu sisään (ENTER)
          </SuccessBtn>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
