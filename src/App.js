import { getLibrary } from "./config/web3";
import { Web3ReactProvider } from "@web3-react/core";

import "./App.css";
import RoutesManager from "./config/RoutesManager";

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <RoutesManager></RoutesManager>
    </Web3ReactProvider>
  );
}

export default App;
