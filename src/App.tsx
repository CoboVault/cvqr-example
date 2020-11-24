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
      <div>
        <span className="copyleft">&copy;</span>
        <span>Cobo Vault Team</span>
      </div>
      <p>Donation: 3Kd5rjiLtvpHv5nhYQNTTeRLgrz4om32PJ</p>
    </div>
  );
}

export default App;
