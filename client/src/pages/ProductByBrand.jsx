import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductListByBrandQuery } from "../redux/features/productApi";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByBrand = () => {
  const { brandID } = useParams();
  const { data: listProduct, isFetching } = useGetProductListByBrandQuery(brandID);

  return (
    <Layout>
      <ProductList defaultProducts={listProduct} defaultFetching={isFetching} />
    </Layout>
  );
};

export default ProductByBrand;
