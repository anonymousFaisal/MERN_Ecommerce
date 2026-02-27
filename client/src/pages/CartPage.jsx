import React from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/product/Brands";
import CartList from "../components/cart/CartList";

const CartPage = () => {
  return (
    <Layout>
      <CartList />
      <Brands />
    </Layout>
  );
};

export default CartPage;
