import React from "react";
import Layout from "./../components/layout/Layout";
import Brands from "../components/product/Brands";
import Slider from "./../components/product/Slider";
import Features from "./../components/features/Features";
import Categories from "./../components/product/Categories";
import Products from "./../components/product/Products";

const HomePage = () => {
  return (
    <Layout>
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;
