import "./BuyNft.css";
import useFractionalNft from "../../hooks/useFractionalNft";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

const BuyNft = () => {
  const { account } = useWeb3React();
  const fractionalNft = useFractionalNft();
  const [status, setStatus] = useState({});
  const [ sellStatus, setSellStatus] = useState({});
  const [ buyStatus, setBuyStatus] = useState({});
  const [slices, setSlices] = useState(2);
  const [forBuy, setForBuy] = useState(0);
  const [forSell, setForSell] = useState(0);
  const [tokenId, setTokenId] = useState();
  const [isFractionate, setIsFractionate] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const [txHash, setTxHash] = useState("");

  // Mint NFT
  const mint = async () => {
    setIsToken(false);
    setIsFractionate(false);
    fractionalNft.methods
      .mint(22)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        setStatus({
          title:'Transaction Sent',
          description: `Please wait... 
                        Transaction Hash: ${<a href={`https://mumbai.polygonscan.com/tx/{txHash}`} target="_blank">{txHash}</a>}`,
          status:'info',
        })
      })
      .on("receipt", (tx) => {
        console.log(true)
        setTokenId(tx.events.Transfer.returnValues.tokenId);
        setStatus({
          title:'Transaction confirmed',
          description: 'NFT minted',
          status:'success',
        })
        setIsToken(true);
      })
      .on("error", (error) => {
        setStatus({
          title:'Transaction Failed',
          description: error.message,
          status:'error',
        })
      });
  }

  // Fractionate NFT
  const fractionate = async () => {
    fractionalNft.methods
      .fractionate(tokenId, slices)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        setStatus({
          title:'Transaction Sent',
          description: `Please wait... 
                        Transaction Hash: ${txHash}`,
          status:'info',
        })
      })
      .on("receipt", (tx) => {
        setTxHash(tx.transactionHash);  
        console.log(tx);
        setStatus({
          title:'Transaction confirmed',
          description: 'NFT fractionated on ' + slices + ' fractions',
          status:'success',
        })
        setIsFractionate(true);
      })
      .on("error", (error) => {
        setStatus({
          title:'Transaction Failed',
          description: error.message,
          status:'error',
        })
      });
  }

  // buy Nft fraction
  const buyFraction = async () => {
    fractionalNft.methods
      .buyFractions(tokenId, forBuy)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        setBuyStatus({
          title:'Transaction Sent',
          description: `Please wait... 
                        Transaction Hash: ${txHash}`,
          status:'info',
        })
      })
      .on("receipt", () => {
        setBuyStatus({
          title:'Transaction confirmed',
          description: 'Buy confirmed for ' + forBuy + ' fractions',
          status:'success',
        })
      })
      .on("error", (error) => {
        setBuyStatus({
          title:'Transaction Failed',
          description: error.message,
          status:'error',
        })
      });
  }

  // sell Nft fraction
  const sellFraction = async () => {
    fractionalNft.methods
      .buyFractions(tokenId, forSell)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        setSellStatus({
          title:'Transaction Sent',
          description: `Please wait... 
                        Transaction Hash: ${txHash}`,
          status:'info',
        })
      })
      .on("receipt", () => {
        setSellStatus({
          title:'Transaction confirmed',
          description: 'Sell confirmed for ' + forSell + ' fractions',
          status:'success',
        })
      })
      .on("error", (error) => {
        setSellStatus({
          title:'Transaction Failed',
          description: error.message,
          status:'error',
        })
      });
  }

  return (
    <div>
      <h2>BuyNft Page</h2>
        <button className="mainLayout-header-nav-button1" onClick={() => mint()}>Buy Nft</button>
        <div>
          <br></br>
          <p>Title: {status.title}</p>
          <p>Information: {status.description}</p>
          <p>status: {status.status}</p>
        </div>
        <br></br>
      {
      isToken?
        <>
          <p>Nft Id: {tokenId}</p>
          <button className="mainLayout-header-nav-button1" onClick={() => fractionate()}>Fractionate</button>
          <input type={"number"} defaultValue="2" className="input-fractions" onChange={(e) => setSlices(e.target.value)}></input>
          <br></br>
        </>
        :""
      }
      {
      isFractionate?
        <>
          <br></br>
          <p>Nft #{tokenId} fractionated in {slices} parts</p>
          <p>Transaction Hash: <a href={`https://mumbai.polygonscan.com/tx/${txHash}`} target="_blank">{txHash}</a></p>
          <>
            <br></br>
            <p>Buy fraccion</p>
            <button className="mainLayout-header-nav-button1" onClick={() => buyFraction()}>Buy</button>
            <input type={"number"} defaultValue="2" className="input-fractions" onChange={(e) => setForBuy(e.target.value)}></input>
            <br></br>
              <p>Title: {buyStatus.title}</p>
              <p>Information: {buyStatus.description}</p>
              <p>status: {buyStatus.status}</p>
            <br></br>
          </>
          <>
            <p>Sell fraction</p>
            <button className="mainLayout-header-nav-button1" onClick={() => sellFraction()}>Sell</button>
            <input type={"number"} defaultValue="2" className="input-fractions" onChange={(e) => setForSell(e.target.value)}></input>
            <br></br>
              <p>Title: {sellStatus.title}</p>
              <p>Information: {sellStatus.description}</p>
              <p>status: {sellStatus.status}</p>
            <br></br>
          </>
        </>
        :""
      }
    </div>
  );
};

export default BuyNft;
