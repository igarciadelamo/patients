import React, { Component } from 'react';
import firebase from 'firebase';

import logo from './images/logo.png';
import './App.css';
import Login from "./login/Login";
import MainTabs from "./common/MainTabs";
import TitleBar from "./common/TitleBar";

class App extends Component {

    constructor(){
        super ();
        this.state = {
            user: null,
        };

        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    handleAuth(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => console.log(`${result.user.email} ha iniciado sesion`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    handleLogout(){
        firebase.auth().signOut()
            .then(() => console.log(`El usuario ha cerrado sesion`))
            .catch(error => console.log(`Error ${error.code}: ${error.message}`));
    }

    render() {
        const titleBar = this.state.user ?  <TitleBar handleLogout={this.handleLogout} /> : <TitleBar />;
        const mainContent = this.state.user ? <MainTabs user={this.state.user}/> : <Login handleAuth={this.handleAuth} />;

        return (
          <div className="App">
              <header className="App-title">
                  {titleBar}
              </header>
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
              </header>
              <div className="App-intro">
                  {mainContent}
              </div>
          </div>
      );
  }
}

export default App;
