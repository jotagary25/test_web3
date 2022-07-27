import { Routes, Route } from "react-router-dom";

// LAYOUTS
import MainLayout from "../layouts/MainLayout";

// PAGES
import MainPage from "../pages/Main";
import InfoUserPage from "../pages/InfoUser";
import BuyNftPage from "../pages/BuyNft";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="infouser" element={<InfoUserPage />} />
        <Route path="buynft" element={<BuyNftPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RoutesManager;
