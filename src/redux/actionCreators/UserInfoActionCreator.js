import {FETCH_BLOCKCHAIN_USER_BALANCE, FETCH_BLOCKCHAIN_USER_INFO, FETCH_BLOCKCHAIN_USER_TRANSACTIONS} from '../actions/UserInfoActions'

const setUserInfoBalance=(address)=>{
return async(dispatch)=>{
const response=await fetch(`https://api-testnet.polygonscan.com/api?module=account&action=balance&address=${address}&apikey=YourApiKeyToken`);
const data=await response.json();

dispatch({
    type:FETCH_BLOCKCHAIN_USER_BALANCE,
    payload: {balance:data.result}
})
}
}


const setUserInfoTransactions=(address)=>{
    return async(dispatch)=>{
        const response=await fetch(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken`);
        const data=await response.json();
        
        dispatch({
            type:FETCH_BLOCKCHAIN_USER_TRANSACTIONS,
            payload: {transactions:data.result}
        })
        }
}

export{ setUserInfoBalance,setUserInfoTransactions};