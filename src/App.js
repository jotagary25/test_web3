import { getLibrary } from "./config/web3";
import { Web3ReactProvider } from "@web3-react/core";
import { Provider } from "react-redux";

import "./App.css";
import RoutesManager from "./config/RoutesManager";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <RoutesManager></RoutesManager>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
