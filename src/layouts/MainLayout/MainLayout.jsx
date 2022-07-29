import { Link, Outlet } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";

import "./MainLayout.css";
import { connector } from "../../config/web3";
import { BireLogo, BurguerIcon } from "../../icons";
import Modal from "../../components/Modal/Modal";
import {
  setWallet,
  unSetWallet,
} from "../../redux/actionCreators/AuthActionCreator";

const HeaderMainLayout = () => {
  const [modalAccept, setModalAccept] = useState(false);
  const openModalAccept = () => setModalAccept(true);

  // Recursos para traer los datos del wallet
  const {
    active,
    activate,
    deactivate,
    error,
    account,
    chainId,
  } = useWeb3React();

  // Constant for UseDispatch methods
  const dispatch = useDispatch();
  useEffect(() => {
    if (account && chainId) {
      dispatch(setWallet(account, chainId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId]);

  // Metodo para conectar con la wallet
  const connect = useCallback(() => {
    setModalAccept(true);
    // activate(connector);
  }, [activate]);

  // useEffect para comprobar de primera instancia si estamos conectados
  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  // Método para desconectar de la wallet
  const disconnect = () => {
    deactivate();
    dispatch(unSetWallet());
    localStorage.removeItem("previouslyConnected");
  };

  // State for BurguerButton
  const [activeMenu, setActiveMenu] = useState(true);
  // Method for onClick on Button
  const BurguerIconButton = (e) => {
    setActiveMenu(!activeMenu);
    let navMenu = document.getElementsByClassName("mainLayout-header-nav");
    let list = navMenu[0];
    console.log(list);

    if (activeMenu) {
      list.classList.remove("top-[-400px]");
      list.classList.add("top-[75px]");
      list.classList.add("opacity-100");
    } else {
      list.classList.remove("top-[75px]");
      list.classList.remove("opacity-100");
      list.classList.add("top-[-400px]");
    }
  };

  // Log's for every variable
  console.log(active);

  return (
    <nav className="bg-white p-3 shadow-lg md:flex md:items-center md:justify-between">
      <section className="flex justify-between items-center md:flex md:items-center">
        <Link to={"/"} className="mainLayout-header-bireLogo">
          <BireLogo />
        </Link>

        <button
          className="cursor-pointer md:hidden block"
          onClick={BurguerIconButton}
        >
          <BurguerIcon fillColor="#666" />
        </button>
      </section>

      <section className="mainLayout-header-nav flex flex-col items-start md:flex md:items-center md:flex-row z-1 md:z-auto md:static absolute bg-white w-full md:w-auto left-0 md:py-0 py-4 md:p1-0 p1-7 md:opacity-100 top-[-400px] transition-all ease-in duration-500">
        <button className="mx-4 my-6 md:my-0">
          <Link to={"/"} className="text-x1 hover:text-cyan-700 duration-500">
            INICIO
          </Link>
        </button>

        <button className="mx-4 my-6 md:my-0 ">
          <Link
            to={"infouser"}
            className="text-x1 hover:text-cyan-700 duration-500"
          >
            INFORMACION
          </Link>
        </button>

        <button className="mx-4 my-6 md:my-0">
          <Link
            to={"buynft"}
            className="text-x1 hover:text-cyan-700 duration-500"
          >
            COMPRAR
          </Link>
        </button>

        {active ? (
          <button
            className="mx-4 my-6 md:my-0 bg-cyan-400 text-white  duration-500 px-6 py-2 rounded hover:bg-cyan-500"
            onClick={disconnect}
          >
            Disconnect
          </button>
        ) : (
          <button
            className="mx-4 my-6 md:my-0 bg-cyan-400 text-white duration-500 px-6 py-2 rounded hover:bg-cyan-500"
            onClick={connect}
          >
            Connect
          </button>
        )}
      </section>

      {modalAccept && <Modal setModal={setModalAccept} />}
    </nav>
  );
};

const ContentMainLayout = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

const MainLayout = () => {
  return (
    <div className="">
      <HeaderMainLayout />
      <ContentMainLayout />
    </div>
  );
};

export default MainLayout;
