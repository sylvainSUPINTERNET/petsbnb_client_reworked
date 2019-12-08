import React from 'react';
import logo from './logo.svg';
import './App.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button} from 'react-bootstrap';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";


import {store, actions} from './redux/store'
import ApplicationComponents from "./components";

import jsonwebtoken from 'jsonwebtoken';


import LoginForm from "./components/Authentication/LoginForm";
import Home from "./components/Home";
import * as config from "./api/config";

function isUserAuthenticated() {
    let isLogged = false;

    jsonwebtoken.verify(localStorage.getItem("accessToken"), config.jwt.secret_dev, (err,decoded) => {
        if(err){
            alert("authentication : " + err);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("accessToken_exp");
            isLogged = false;
        } else {
            // todo -> set le decoded payload in store if that necessary
            console.log(decoded);
            isLogged = true;
        }
    });
    return isLogged;
}

function App() {
    return (


        <Router>
            <div>
                <header>

                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark blue darken-3 primary-color scrolling-navbar">
                        <a className="navbar-brand" href="#"><strong>PetsBNB </strong><i className="fa fa-dog"></i></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Acceuil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Déconnexion</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" target="_blank" href="http://localhost:4999/join">Messagerie</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav nav-flex-icons">
                                <li className="nav-item">
                                    <a className="nav-link"><i className="fab fa-facebook-f"></i></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"><i className="fab fa-twitter"></i></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link"><i className="fab fa-instagram"></i></a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                </header>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/"
                           component={
                               () => {
                                   if(isUserAuthenticated() === true){
                                       return <Home/>
                                   } else {
                                       return <Redirect to='/auth/login'/>
                                   }
                           }}/>
                    <Route exact path="/auth/login" component={() => <LoginForm/>}/>
                    <Route exact path="/logout" component={() => <Logout/>}/>
                </Switch>
            </div>
        </Router>
    );
}

function Logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken_exp");
    return <Redirect to='/auth/login'/>
}

/* Exemple using store
function Login() {
    store.dispatch(actions.createAuthAccess('my-jwt-token'));
    console.log(store.getState());
    return <h2>Login</h2>;
}
 */


export default App;


