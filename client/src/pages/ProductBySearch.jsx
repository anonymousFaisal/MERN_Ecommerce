import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "./../store/useProductStore";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductBySearch = () => {
  const { searchQuery } = useParams();
  const { fetchListBySearch } = useProductStore();
  useEffect(() => {
    (async () => {
      try {
        await fetchListBySearch(searchQuery);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductBySearch;
