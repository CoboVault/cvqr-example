import React from 'react';
import './App.css';
import {Encoder} from './Components/Encoder';
import {Decoder} from './Components/Decoder';
import {DataTypeSelector} from './Components/DataTypeSelector';

function App() {
  return (
    <div className="App">
      <DataTypeSelector>
        <p>Encoder</p>
        <Encoder />
        <p>Decoder</p>
        <Decoder />
      </DataTypeSelector>
    </div>
  );
}

export default App;
