import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWallet } from "../../redux/actionCreators/AuthActionCreator";
import { setUserInfoBalance, setUserInfoTransactions } from "../../redux/actionCreators/UserInfoActionCreator";
import "./InfoUser.css";

const TransactionCard=()=>{
  return (<div>


  </div>)
}

const TransactionContainer=()=>{
  const transactions=useSelector(state=>state.userInfo.transactions);
  console.log("child");
  return (<div className="tran-container"> 

    {JSON.stringify(transactions)}

  </div>)
}


const InfoUser = () => {
  
  const dispatch =useDispatch();
  const wallet=useSelector(state=>state.account.address);
  const balance=useSelector(state=>state.userInfo.balance);
  useEffect(()=>{
    dispatch(setUserInfoBalance(wallet));
    dispatch(setUserInfoTransactions(wallet));
    
  },[wallet]);
  console.log("father");
/*  
  const setDummyAddres=()=>{
    //dispatch(setWallet("add1",10));
    console.log("entra");
  //setUserInfo('0x20a3Ed385cF3a561C4De57FA8d818AF9143f9567')();
  }*/
  return (
    <div>
      
      <h1>Tu wallet es {wallet}</h1>
      <h2>Informacion de Transacciones</h2>
      <TransactionContainer/>
      <h2>Tu saldo son {balance/1000000000000000000} MATIC</h2>
    </div>
  );
};

export default InfoUser;
