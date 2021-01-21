import React from 'react';
import ReactDOM from 'react-dom';

import 'dso-toolkit/dist/toolkit/styles/dso.css';
import { defineCustomElements, setAssetPath } from '@dso-toolkit/core';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

setAssetPath(document.baseURI);
defineCustomElements();
