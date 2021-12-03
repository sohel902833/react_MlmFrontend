import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    {/* <HashRouter> */}
      <App />
    {/* </HashRouter> */}
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
