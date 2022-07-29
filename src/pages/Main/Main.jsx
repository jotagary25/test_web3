import { useSelector } from "react-redux";

import "./Main.css";

const Main = () => {
  const address = useSelector((state) => state.account.address);
  const mumbaiNet = useSelector((state) => state.account.chainId);

  return (
    <div className="p-5">
      <h2 className="text-xl text-red-500 font-semibold">
        Información de conexión!
      </h2>
      <h3 className="text-lg text-blue-600">Account Adress:</h3>
      <span>{address ? address : "no connect"}</span>
      <br />
      <br />
      <h3 className="text-lg text-blue-600">Mumbai Polygon ID: </h3>
      <p>{mumbaiNet ? mumbaiNet : "no connect"}</p>
    </div>
  );
};

export default Main;
