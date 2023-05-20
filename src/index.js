import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';

// eslint-disable-next-line import/no-extraneous-dependencies
const cheerio = require('cheerio');

const fetchData = async () => {
  try {
    const jobUrl = await axios.get('./jobPortals.json');
    const { myJobPortals } = await jobUrl.data;
    const { url } = myJobPortals[0];

    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const body = $('body').text().trim();
    console.log(body);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
