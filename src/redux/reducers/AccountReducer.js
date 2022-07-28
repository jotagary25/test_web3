import { SET_WALLET, UNSET_WALLET } from "../actions/AuthActions";

const defaultState = {
  isLogged: false,
  address: null,
  chainId: null,
  balance: null,
};

const AccountReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_WALLET:
      return {
        ...state,
        isLogged: true,
        address: payload.address,
        chainId: payload.chainId,
      };
    case UNSET_WALLET:
      return {
        ...state,
        isLogged: false,
        address: null,
        chainId: null,
      };
    default:
      return state;
  }
};

export default AccountReducer;
