import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserProvider from "./context/auth";
import JobsProvider from './context/jobs';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <JobsProvider>
        <App />
      </JobsProvider>
    </UserProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

