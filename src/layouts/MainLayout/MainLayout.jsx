import { Link, Outlet } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";

import "./MainLayout.css";
import { connector } from "../../config/web3";

const HeaderMainLayout = () => {
  // Recursos para traer los datos del wallet
  const {
    active,
    activate,
    deactivate,
    error,
    account,
    chainId,
  } = useWeb3React();

  // Metodo para conectar con la wallet
  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", true);
  }, [activate]);

  // useEffect para comprobar de primera instancia si estamos conectados
  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  // Método para desconectar de la wallet
  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  // Log's for every variable
  console.log(active);
  console.log(error);
  console.log(account);
  console.log(chainId);

  return (
    <div className="mainLayout-header">
      <div className="mainLayout-header-nav">
        <Link to={"/"}>
          <button className="mainLayout-header-nav-button1">Inicio</button>
        </Link>
        <Link to={"infouser"}>
          <button className="mainLayout-header-nav-button1">Información</button>
        </Link>
        <Link to={"buynft"}>
          <button className="mainLayout-header-nav-button1">Comprar</button>
        </Link>
      </div>
      {active ? (
        <button className="mainLayout-header-nav-button2" onClick={disconnect}>
          Disconnect
        </button>
      ) : (
        <button className="mainLayout-header-nav-button2" onClick={connect}>
          Connect
        </button>
      )}
    </div>
  );
};

const ContentMainLayout = () => {
  return (
    <div className="mainLayout-content">
      <Outlet />
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <HeaderMainLayout />
      <ContentMainLayout />
    </div>
  );
};

export default MainLayout;
