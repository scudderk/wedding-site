import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSubmit = async (e) => {
  return fetch("http://localhost:3000/wedding/api/logout", {
    method: "POST",
    credentials: 'include',
  })
  .then(response => response.json())
  .catch((error) => error);
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
