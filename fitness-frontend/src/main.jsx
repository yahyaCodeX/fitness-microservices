import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from 'react-oauth2-code-pkce';
import { authConfig } from './authConfig'; // Your existing config

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider authConfig={authConfig}>
    <App />
  </AuthProvider>
);