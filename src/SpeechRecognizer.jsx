import React, { Component, Fragment } from 'react';
import SpeechRecognition from 'react-speech-recognition';

const SENTIMENT_ENDPOINT = 'https://northeurope.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
const SENTIMENT_APIKEY = process.env.APIKEY || '';

const headers = {
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-Key': SENTIMENT_APIKEY,
};

class SpeechRecognizer extends Component {
  constructor(props) {
    super(props);

    const { recognition } = props;
    recognition.lang = 'fi-FI';

    this.state = { sentiment: null };
  }

  getSentiment = async () => {
    const { transcript } = this.props;

    const data = {
      documents: [{
        id: "1",
        text: transcript,
      }],
    };

    const request = {
      uri: SENTIMENT_ENDPOINT,
      params: {
        headers,
        method: 'POST',
        body: JSON.stringify(data),
      },
    }

    const response = await fetch(request.uri, request.params);
    const result = await response.json();

    this.setState({ sentiment: result.documents[0].score });
  }

  reset = () => {
    const { resetTranscript } = this.props;

    resetTranscript();
  }

  render() {
    const { transcript, recognition, resetTranscript, browserSupportsSpeechRecognition } = this.props;
    const { sentiment } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <Fragment>
        <h3>Sanelemasi teksti</h3>
        <p style={{ minHeight: '50px' }}>{ transcript }</p>
        <p>Sentimentti: { sentiment ? parseFloat(sentiment).toFixed(2) : 'Ei tiedossa' }</p>

        <button onClick={this.getSentiment} className="uk-button uk-button-secondary uk-width-1-1">Analysoi</button>

        <button onClick={resetTranscript} className="uk-button uk-button-default uk-width-1-1">Tyhjennä</button>
      </Fragment>
    );
  }
}

const options = { lang: 'fi-FI', autoStart: true };

export default SpeechRecognition(options)(SpeechRecognizer);
