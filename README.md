# Speech Sentiment Analysis

This project uses Google Chrome speech recognition and Azure sentiment analysis to understand speech through browser and make a sentiment analysis with the help of Azure Text Analysis API.

## Running the code

### What you will need

* [nodejs](https://nodejs.org/en/download/package-manager/) or [docker](https://docs.docker.com/install/).
* [Azure Text Analytics API key](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/)

### Running with Node

* Install [nodejs](https://nodejs.org/en/download/package-manager/).
* Go to the project directory using a terminal / shell.
* Install dependencies `npm install`
* Run the app `APIKEY=... npm start`
* Open browser in [http://localhost:8000](http://localhost:8000)

### Running with Docker

* Install [docker](https://docs.docker.com/install/).
* Go to the project directory using a terminal / shell.
* Build the app `docker build -t speech-sentiment .` (this is an optional step on the first time)
* Run the app `docker run -it -e "APIKEY=..." -p 8000:8000 speech-sentiment`
* Open browser in [http://localhost:8000](http://localhost:8000)

### Running with Docker Compose

* Install [docker](https://docs.docker.com/install/).
* Go to the project directory using a terminal / shell.
* Build the app `docker-compose build` (this is an optional step on the first time)
* Run the app `APIKEY=... docker-compose up`
* Open browser in [http://localhost:8000](http://localhost:8000)
