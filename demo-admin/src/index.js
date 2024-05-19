import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Auth0Provider } from '@auth0/auth0-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rg26yv2zn06sl65d.us.auth0.com"
      clientId="XoBk1671UxcZmg7bVaXxs4iU0JLckxp7"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
    <BrowserRouter>
    <CartProvider>
    <GoogleOAuthProvider clientId="896506795081-hvjgls3gdo6tvfbg1dpvhfeoiodqifrp.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>;
    </CartProvider>
    </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
