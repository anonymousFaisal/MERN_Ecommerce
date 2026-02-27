import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductListBySearchQuery } from "../redux/features/productApi";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductBySearch = () => {
  const { keyword } = useParams();
  const { data: listProduct, isFetching } = useGetProductListBySearchQuery(keyword);

  return (
    <Layout>
      <ProductList defaultProducts={listProduct} defaultFetching={isFetching} />
    </Layout>
  );
};

export default ProductBySearch;
