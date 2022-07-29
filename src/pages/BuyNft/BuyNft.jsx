import "./BuyNft.css";
import useFractionalNft from "../../hooks/useFractionalNft";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

const BuyNft = () => {
  const { account } = useWeb3React();
  const fractionalNft = useFractionalNft();
  const [status, setStatus] = useState({});
  const [slices, setSlices] = useState(2);
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
          title:'Transaccion Enviada',
          description: `Por favor espere... 
                        Hash de la transaccion: ${txHash}`,
          status:'info',
        })
      })
      .on("receipt", (tx) => {
        console.log(true)
        setTokenId(tx.events.Transfer.returnValues.tokenId);
        setStatus({
          title:'Transaccion confirmada',
          description: 'NFT minted',
          status:'success',
        })
        setIsToken(true);
      })
      .on("error", (error) => {
        setStatus({
          title:'Transaccion Fallida',
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
          title:'Transaccion Enviada',
          description: `Por favor espere... 
                        Hash de la transaccion: ${<a href={`https://mumbai.polygonscan.com/tx/{txHash}`}>{txHash}</a>}`,
          status:'info',
        })
      })
      .on("receipt", (tx) => {
        setTxHash(tx.transactionHash);  
        console.log(tx);
        setStatus({
          title:'Transaccion confirmada',
          description: 'NFT fraccionado en ' + slices + ' partes',
          status:'success',
        })
        setIsFractionate(true);
      })
      .on("error", (error) => {
        setStatus({
          title:'Transaccion Fallida',
          description: error.message,
          status:'error',
        })
      });
  }

  // See NFT for 
  const buyFraccion = async () => {
    fractionalNft.methods
      .buyFraccion(tokenId, slices)
  }

  return (
    <div>
      <h2>BuyNft Page</h2>
        <button className="mainLayout-header-nav-button1" onClick={() => mint()}>Buy Nft</button>
        <div>
          <br></br>
          <p>Title: {status.title}</p>
          <p>Transaction Hash: {status.description}</p>
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
          <p>Transaction Hash: <a href={`https://mumbai.polygonscan.com/tx/${txHash}`}>{txHash}</a></p>
        </>
        :""
      }
        <>
          <p>Buy fraccion</p>
          <button className="mainLayout-header-nav-button1" onClick={() => fractionate()}>Buy</button>
          <input type={"number"} defaultValue="2" className="input-fractions" onChange={(e) => setSlices(e.target.value)}></input>
          <br></br>
        </>
        <>
          <p>Sell fraction</p>
          <button className="mainLayout-header-nav-button1" onClick={() => fractionate()}>Fraccionnar</button>
          <input type={"number"} defaultValue="2" className="input-fractions" onChange={(e) => setSlices(e.target.value)}></input>
          <br></br>
        </>
    </div>
  );
};

export default BuyNft;
