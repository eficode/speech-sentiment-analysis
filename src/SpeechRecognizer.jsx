import React, { Component, Fragment } from 'react';
import SpeechRecognition from 'react-speech-recognition';

class SpeechRecognizer extends Component {
  constructor(props) {
    super(props);

    const { recognition } = props;
    recognition.lang = 'fi-FI';
  }

  reset = () => {
    const { resetTranscript } = this.props;

    resetTranscript();
  }

  render() {
    const { transcript, recognition, resetTranscript, browserSupportsSpeechRecognition } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <Fragment>
        <h3>Sanelemasi teksti</h3>
        <p style={{ minHeight: '50px' }}>{ transcript }</p>

        <button onClick={resetTranscript} className="uk-button uk-button-default uk-width-1-1">Tyhjennä</button>
      </Fragment>
    );
  }
}

const options = { lang: 'fi-FI', autoStart: true };

export default SpeechRecognition(options)(SpeechRecognizer);
