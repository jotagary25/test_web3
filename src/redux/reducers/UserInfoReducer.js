import{FETCH_BLOCKCHAIN_USER_BALANCE, FETCH_BLOCKCHAIN_USER_TRANSACTIONS} from '../actions/UserInfoActions'



const defaultState = {
    balance:0,
    transactions:[]
  };


const UserInfoReducer=(state=defaultState,action)=>{
const{type,payload}=action;

switch(type){
    case FETCH_BLOCKCHAIN_USER_BALANCE:
        return {
            ...state,
            balance:payload.balance
        };
    case FETCH_BLOCKCHAIN_USER_TRANSACTIONS:
        return {
            ...state,
            transactions:payload.transactions
        }
    default:
        return state;
}

}
export default UserInfoReducer;