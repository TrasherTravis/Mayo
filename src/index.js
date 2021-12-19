import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { RootStore, StoreProvider } from './stores/RootStore';

const store = new RootStore();

const getLibrary = (provider) => {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <App />
      </Web3ReactProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
