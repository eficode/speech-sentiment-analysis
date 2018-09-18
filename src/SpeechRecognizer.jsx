import React, { PropTypes, Component } from 'react';
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

    const { recognition } = this.props;

    recognition.lang = 'fi-FI';

    this.state = { sentiment: null };
  }

  componentDidMount() {
    const { recognition, update } = this.props;
    recognition.lang = 'fi-FI';
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
    this.setState({ sentiment: null });
  }

  render() {
    const { transcript, recognition, resetTranscript, browserSupportsSpeechRecognition } = this.props;
    const { sentiment } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    return (
      <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport">
        <div className="uk-width-large uk-padding-small">
          <div className="uk-card uk-card-default uk-width-1-1">
            <div className="uk-card-header">
              <h3 className="uk-card-title">Sanelemasi teksti</h3>
            </div>
            <div className="uk-card-body">
              { transcript }
            </div>
            <div className="uk-card-footer">
              <p>Sentimentti: { sentiment ? parseFloat(sentiment).toFixed(2) : 'Ei tiedossa' }</p>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <button onClick={this.getSentiment} className="uk-button uk-button-secondary uk-width-1-1">Analysoi</button>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-inline uk-width-1-1">
              <button onClick={resetTranscript} className="uk-button uk-button-default uk-width-1-1">Tyhjennä</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const options = {
  lang: 'fi-FI',
  autoStart: true,
}

export default SpeechRecognition(options)(SpeechRecognizer);
