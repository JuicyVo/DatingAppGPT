import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-sb7g1frlkt1tof1z.us.auth0.com"
    clientId="wnR2mpIMJq2Jwf62FhEH2ZcLd8H3Qz6V"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
