import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

global.React = React;
global.render = render;
global.userEvent = userEvent;

process.env.REACT_APP_FIREBASE_API_KEY = 'AIzaSyBXM6KOXB1j_FBOTGZTmDKT2z8Pv_Dxk4I';
process.env.REACT_APP_FIREBASE_AUTH_DOMAIN = 'pursuit-of-trivia-dev.firebaseapp.com';
process.env.REACT_APP_FIREBASE_PROJECT_ID = 'pursuit-of-trivia-dev';
process.env.REACT_APP_FIREBASE_STORAGE_BUCKET = 'pursuit-of-trivia-dev.appspot.com';
process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '942910229698';
process.env.REACT_APP_FIREBASE_APP_ID = '1:942910229698:web:ad26f12a1999195051ff5b';
process.env.REACT_APP_BASE_URL = 'https://pursuit-of-trivia-api-dev.herokuapp.com';
