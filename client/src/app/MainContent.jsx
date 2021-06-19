import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../app/LoginBox";
import { NavBar } from "../components";
import { GuestList, GuestInsert, GuestUpdate } from "../pages";
import useToken from "./useToken";

import "bootstrap/dist/css/bootstrap.min.css";

function MainContent() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/guest/list" exact component={GuestList} />
        <Route path="/guest/create" exact component={GuestInsert} />
        <Route path="/guest/update/:id" exact component={GuestUpdate} />
      </Switch>
    </Router>
  );
}

export default MainContent;
