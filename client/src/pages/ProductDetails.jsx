import React from "react";
import Layout from "./../components/layout/Layout";
import Details from "../components/product/Details";
import Brands from "./../components/product/Brands";

const ProductDetails = () => {
  return (
    <Layout>
      <Details />
      <Brands />
    </Layout>
  );
};

export default ProductDetails;
