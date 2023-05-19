import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';

const jobUrl = await axios.get('./jobPortals.json');
const { my_job_portals } = await jobUrl.data;
const { url } = my_job_portals[0];
console.log(url);

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
