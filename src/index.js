import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';

import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from './hooks/metamask'

const rootElement = document.getElementById("root");

function getLibrary(provider, connector) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    {/* <Web3ReactProvider getLibrary={getLibrary}> */}
      {/* <MetaMaskProvider> */}
        <App />
      {/* </MetaMaskProvider> */}
    {/* </Web3ReactProvider> */}
  </React.StrictMode>,
  rootElement
);
