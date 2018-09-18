import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import SpeechRecognizer from './SpeechRecognizer';

const App = () => (
  <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
    <div className="uk-width-large uk-padding-small">
      <SpeechRecognizer />
    </div>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
