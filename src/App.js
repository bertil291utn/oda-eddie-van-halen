import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import TrackList from './containers/TrackList';
import 'bootstrap/dist/css/bootstrap.min.css';
import EddiesBio from './components/EddiesBio';
import BackgroundImage from './assets/images/background.jpg';
import NavBar from './components/NavBar';


function App() {
  const stylesTrackList = {
    background: `url(${BackgroundImage})`,
    height: '100vh',

  };
  return (
    <div className="App" style={stylesTrackList}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/albums">
              <TrackList />
            </Route>
            <Route path="/">
              <EddiesBio />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
