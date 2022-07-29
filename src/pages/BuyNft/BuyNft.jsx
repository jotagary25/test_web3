import "./BuyNft.css";
import useFractionalNft from "../../hooks/useFractionalNft";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

const BuyNft = () => {
  const { account } = useWeb3React();
  const fractionalNft = useFractionalNft();
  const [status, setStatus] = useState({});
  const [isMintin, setMintin] = useState(false);

  // Mint NFT
  const mint = async () => {
    setMintin(true);
    fractionalNft.methods
      .mint(22)
      .send({
        from: account,
      })
      .on("transactionHash", (txHash) => {
        setStatus({
          title:'Transaccion Enviada',
          description: txHash,
          status:'info',
        })
      })
      .on("receipt", () => {
        setStatus({
          title:'Transaccion confirmada',
          description: 'NFT minted',
          status:'success',
        })
        setMintin(false);
      })
      .on("error", (error) => {
        setStatus({
          title:'Transaccion Fallida',
          description: error.message,
          status:'error',
        })
        setMintin(false);
      });
  }

  return (
    <div>
      <h2>Pagina de BuyNft</h2>
      <button className="mainLayout-header-nav-button1" onClick={() => mint()}>Buy Nft</button>
      <div>
        <p>Title: {status.title}</p>
        <p>Hash de la transaccion: {status.description}</p>
        <p>status: {status.status}</p>
      </div>
    </div>
  );
};

export default BuyNft;
