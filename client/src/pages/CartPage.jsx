import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/product/Brands";
import CartList from "../components/cart/CartList";
import useProductStore from "../store/useProductStore";

const CartPage = () => {
  const { fetchBrands, brandList } = useProductStore();
  useEffect(() => {
    (async () => {
      try {
        brandList === null ? await fetchBrands() : null;
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <CartList />
      <Brands />
    </Layout>
  );
};

export default CartPage;
