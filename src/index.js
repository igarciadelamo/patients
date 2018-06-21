import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase';
import config from './firebaseConfig'

import './index.css';
import ThemeApp from './ThemeApp';

import registerServiceWorker from './registerServiceWorker';


firebase.initializeApp(config);
ReactDOM.render(<ThemeApp />, document.getElementById('root'));
registerServiceWorker();
