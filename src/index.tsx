import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OzaHlD3qVhmZEFqgIec4p65HKBDnitPW7ED7oMMbpMCkZDj3TXrXtiElNv6EFhzD5blCTpuLC12O2UqPZkwu1Qr00R9fGOwnU');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <Elements stripe={stripePromise}>
      <App />
  </Elements>
  </BrowserRouter>
);


