import React from 'react';
import API from './Api';
import './App.css';

function App() {
  API.getArtist();
  API.getSongDetail('van halen');
  return (
    <div className="App">
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
