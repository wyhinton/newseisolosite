import React from "react";
import ReactDOM from "react-dom";

import "./styles.scss";

import Audio from "./Audio";

function App() {
  return (
    <div className="App">
      <Audio />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
