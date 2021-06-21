import React from "react";
import "./style/site.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components";
import { Home, Login } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import GuestList from "./pages/GuestList";

function Routes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/guest/list" exact component={GuestList} />
      </Switch>
    </Router>
  );
};

export default Routes;
