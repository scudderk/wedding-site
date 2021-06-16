import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//Login Box
function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function showValidationErr(errorList) {
    setErrors(errorList);
  }
  function clearValidationErr(elm) {
    setErrors((prevState) => {
      let newArr = [];
      if (errors.length > 0) {
        for (let err of errors) {
          if (elm !== err.elm) {
            newArr.push(err);
          }
        }
      }
      setErrors(newArr);
    });
  }
  function onUsernameChange(e) {
    setUsername(e.target.value);
    clearValidationErr("username");
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
    clearValidationErr("password");
  }
  function submitLogin(e) {
    const errorList = [];
    if (username === "") {
      errorList.push({ elm: "username", msg: "Username must not be empty" });
    }
    if (password === "") {
      errorList.push({ elm: "password", msg: "Password must not be empty" });
    }
    showValidationErr(errorList);
    if (username === "kandr" && password === "Leaky2019<3") {
      localStorage.setItem("loggedIn", true);
      window.location.reload();
    }
  }
  let usernameErr = null,
    passwordErr = null;

  if (errors != null) {
    if (errors.length > 0) {
      for (let err of errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
      }
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-6 offset-3">
        <div className="container">
          <div className="card bg-secondary">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="card-title">Login form</div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      onChange={onUsernameChange.bind(this)}
                    />
                    <small className="danger-error">
                      {usernameErr ? usernameErr : ""}
                    </small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={onPasswordChange.bind(this)}
                    />
                    <small className="danger-error">
                      {passwordErr ? passwordErr : ""}
                    </small>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <button
                    div
                    className="btn btn-primary"
                    onClick={submitLogin.bind(this)}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginBox;
