import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This assumes you have a <div id="root"> in your public/index.html
);