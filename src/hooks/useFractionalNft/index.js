import fractionalNft from "../../config/artifacts";
import { useMemo } from "react"; 
import { useWeb3React } from "@web3-react/core";

const { address, abi } = fractionalNft;

//Custom hook to get the contract instance
const useFractionalNft = () => {
  const { active, library, chainId } = useWeb3React();

  const FractionalNft = useMemo(() => {
    if(active) return new library.eth.Contract(abi, address[chainId]);
    
  }, [active, chainId, library?.eht?.Contract]);

  return FractionalNft;
};

export default useFractionalNft;