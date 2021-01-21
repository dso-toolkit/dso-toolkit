import React from 'react';
import ReactDOM from 'react-dom';

import 'dso-toolkit/dist/toolkit/styles/dso.css';
import { defineCustomElements } from '@dso-toolkit/core';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

defineCustomElements();
