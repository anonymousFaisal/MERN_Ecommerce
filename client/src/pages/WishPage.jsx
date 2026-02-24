import React from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/product/Brands";
import WishList from "./../components/wish/WishList";

const WishPage = () => {
  return (
    <Layout>
      <WishList />
      <Brands />
    </Layout>
  );
};

export default WishPage;
