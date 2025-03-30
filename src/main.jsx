import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const BASE_URL = import.meta.env.BASE_URL;

const GlobalStyle = createGlobalStyle`
  /* Remove Google Font import */
  /* @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap'); */

  /* Remove local font face */
  /*
  @font-face {
    font-family: 'VT323';
    src: url('/fonts/VT323-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: fallback;
  }
  */

  @font-face {
    font-family: 'Courier New'; /* Use Courier New as specified */
    /* We don't need src if it's a system font */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Courier New', monospace;
    line-height: 1.4;
    font-synthesis: none;
    min-height: 100%; /* Ensure html takes full height */
  }

  body {
    /* background: #2c3e50; */ /* Remove direct background color */
    color: #ecf0f1;
    min-height: 100vh; /* Ensure body takes full viewport height */
    position: relative; /* Needed for pseudo-element positioning */
    overflow: hidden; /* Prevent potential body scrollbars */
  }

  body::before {
    content: '';
    position: fixed; /* Cover the entire viewport */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1; /* Place behind all other content */

    background-image: url('${BASE_URL}images/bg.png'); /* Use BASE_URL */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px); /* Apply blur - adjust 5px as needed */
    
    /* Optional: Add a subtle dark overlay on top of the blurred image */
    /* background-color: rgba(0, 0, 0, 0.2); */ 
    /* background-blend-mode: overlay; */ 
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
); 