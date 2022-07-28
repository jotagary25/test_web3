import { SET_WALLET, UNSET_WALLET } from "../actions/AuthActions";

const setWallet = (address, chainId) => {
  return async (dispatch) => {
    console.log(address);
    console.log(chainId);
    dispatch({
      type: SET_WALLET,
      payload: {
        address: address,
        chainId: chainId,
      },
    });
  };
};

const unSetWallet = () => {
  return async (dispatch) => {
    dispatch({
      type: UNSET_WALLET,
    });
  };
};

export { setWallet, unSetWallet };
