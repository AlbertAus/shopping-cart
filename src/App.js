import 'react-app-polyfill/ie11';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { tsConstructorType } from '@babel/types';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the testing for react Shopping Cart.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shopping Cart
        </a>
      </header>
    </div>
  );
}

export default App;
