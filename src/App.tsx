import React from "react";
import "./App.css";
import {Encoder} from './Components/Encoder';
import {Decoder} from "./Components/Decoder";

function App() {
  return <div className="App">
      <p>Encoder</p>
      <Encoder />
      <p>Decoder</p>
      <Decoder />
  </div>;
}

export default App;
