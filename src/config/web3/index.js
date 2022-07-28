import web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

const POLYGON_NETWORK_ID = 137;
const MUMBAI_TEST_NETWORK_ID = 80001;

export const connector = new InjectedConnector({
  supportedChainIds: [POLYGON_NETWORK_ID, MUMBAI_TEST_NETWORK_ID],
});

export const getLibrary = (provider) => {
  const library = new web3(provider);
  return library;
};
