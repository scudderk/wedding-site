import React, { Component } from "react";
import ".././style/site.css";
import LoginBox from "../app/LoginBox";
import MainContent from "../app/MainContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      loggedIn: false,
    };
  }
  UNSAFE_componentWillMount = async () => {
    if (localStorage.getItem("loggedIn") === "true") {
      this.state.isLoginOpen = false;
    } else {
      this.state.isLoginOpen = true;
    }
  };

  render() {
    let loggedIn = true;
    if (loggedIn) {
      loggedIn = true;
    }

    return (
      <div>
        <div className="my-auto">{this.state.isLoginOpen && <LoginBox />}</div>
        <div className="my-auto">{!this.state.isLoginOpen && <MainContent />}</div>
      </div>
    );
  }
}

export default App;
