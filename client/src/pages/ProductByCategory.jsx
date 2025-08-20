import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "./../store/useProductStore";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByCategory = () => {
  const { categoryID } = useParams();
  const { fetchListByCategory } = useProductStore();
  useEffect(() => {
    (async () => {
      try {
        await fetchListByCategory(categoryID);
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default ProductByCategory;
