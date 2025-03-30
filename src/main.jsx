import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { createGlobalStyle } from 'styled-components'; // Remove this import
import './styles/global.scss'; // Import the global SCSS file

// Remove the BASE_URL constant if not used elsewhere in this file
// const BASE_URL = import.meta.env.BASE_URL; 

// Remove the GlobalStyle component definition entirely
/*
const GlobalStyle = createGlobalStyle`
  // ... styles ...
`;
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Remove the GlobalStyle component instance */}
    {/* <GlobalStyle /> */} 
    <App />
  </React.StrictMode>
); 