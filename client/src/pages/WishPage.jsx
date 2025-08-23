import React from "react";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/product/Brands";
import WishList from "./../components/wish/WishList";
import useProductStore from "../store/useProductStore";

const WishPage = () => {
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
      <WishList />
      <Brands />
    </Layout>
  );
};

export default WishPage;
