import React, { useEffect, useState } from "react";
import "./App.css";
import {
  AnimatedQRCodeV1,
  AnimatedQRCodeV2,
} from "./Components/AnimatedQRCode";
import { V1, V2 } from "@cvbb/qr-protocol/dist";

function App() {
  const [data, setData] = useState("something");
  useEffect(() => {
    if (data.length === 0) {
      setData("something");
    }
  }, [data]);
  return (
    <div className="App">
      <div className="row">
        <textarea
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
          cols={100}
          rows={20}
        />
      </div>
    </div>
  );
}

export default App;
