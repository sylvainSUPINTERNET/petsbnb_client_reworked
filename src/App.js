import React from 'react';
import logo from './logo.svg';
import './App.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {store, actions} from './redux/store'


function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              /*add component here*/
            </Route>
            <Route path="/">
              <Home/>
              /*add component here*/
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

function About() {
  store.dispatch(actions.createAuthAccess('my-jwt-token'));
  console.log(store.getState());
  return <h2>About</h2>;
}


function Home() {
  console.log(store.getState());
  return <h2>Home</h2>
}

export default App;
