import React, { Component } from "react";
import ".././style/site.css";
import MainContent from "../app/MainContent";

class App extends Component {
  render() {
    return (
      <div>
        <div className="my-auto"><MainContent /></div>
      </div>
    );
  }
}

export default App;
