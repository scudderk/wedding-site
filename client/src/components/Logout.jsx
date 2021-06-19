import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSubmit = async (e) => {
  localStorage.setItem('token', '{}');
}

function Logout() { 
  return (
    <div className="row">
      <div className="col">
      <form onSubmit={handleSubmit}>
                <button className="btn btn-outline-success me-2"
          type="submit"
        >
          Logout
        </button>
        </form>
      </div>
    </div>
  );
}

export default Logout;
