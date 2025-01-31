import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import { FormContextProvider } from './context/FormContext';
import {  UserContextProvider } from './context/UserContext';
import {  ProductContextProvider } from './context/ProductContext';
import { CartContextProvider } from './context/CartContext';
import {  ReviewContextProvider } from './context/ReviewContext';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <FormContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <ProductContextProvider>
              <CartContextProvider>
                <ReviewContextProvider>
                  <App />
                </ReviewContextProvider>
              </CartContextProvider>
            </ProductContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </FormContextProvider>
    </Router>
  </React.StrictMode>,
);