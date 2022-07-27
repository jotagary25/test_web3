import { Link, Outlet } from "react-router-dom";

import "./MainLayout.css";

const HeaderMainLayout = () => {
  return (
    <div className="mainLayout-header">
      <div className="mainLayout-header-nav">
        <Link className="mainLayout-header-nav1" to={"/"}>
          Inicio
        </Link>
        <Link className="mainLayout-header-nav1" to={"infouser"}>
          Información
        </Link>
        <Link className="mainLayout-header-nav1" to={"buynft"}>
          Comprar
        </Link>
      </div>
      <button className="mainLayout-header-conect">Conectar </button>
      {/* <section></section> */}
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
