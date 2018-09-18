import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import SpeechRecognizer from './SpeechRecognizer';

const App = () => <SpeechRecognizer />;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
