import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import Firebase,{FirebaseContext,} from './FirebaseConf/Context';
import {LoggedInUsersProvider} from './LoggedInUsers/LoggedInUsersContext'


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
  <LoggedInUsersProvider>
  <Router>
    <App />
  </Router>
  </LoggedInUsersProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

