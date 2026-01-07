import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './ThemeContext';
import { AudioProvider } from './AudioContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </ThemeProvider>
  </React.StrictMode>
);

