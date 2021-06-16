import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function submitLogin(e) {
  localStorage.setItem('loggedIn', false);
  window.location.reload(false);
}

function Logout() { 
  return (
    <div className="row">
      <div className="col">
        <button className="btn btn-outline-success me-2"
          onClick={submitLogin.bind(this)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
