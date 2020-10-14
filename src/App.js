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
import NavBar from './components/NavBar';
import SongDetailModal from './components/SongDetailModal';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavBar />
          <div className="app-content">
            <Switch>
              <Route path="/albums">
                <TrackList />
              </Route>
              <Route path="/track/:id" component={SongDetailModal} />
              <Route path="/">
                <EddiesBio />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div >
  );
}

export default App;
