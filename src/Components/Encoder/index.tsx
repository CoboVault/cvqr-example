import React, { useState } from "react";
import "./index.css";

export const Encoder = () => {
  const [data, setData] = useState("");
  return (
    <div>
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
};
