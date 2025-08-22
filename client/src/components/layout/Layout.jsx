import React, { useEffect } from "react";
import AppNavBar from "./AppNavBar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const params = useLocation().pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  },[params]);
  return (
    <div>
      <AppNavBar />

      {props.children}
      <Toaster position="bottom-center" reverseOrder={false} />

      <Footer />
    </div>
  );
};

export default Layout;
