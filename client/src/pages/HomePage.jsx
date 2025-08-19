import React from "react";
import { useEffect } from "react";
import Layout from "./../components/layout/Layout";
import Brands from "../components/product/Brands";
import useProductStore from "./../store/useProductStore";
import useFeatureStore from "./../store/useFeatureStore";
import Slider from "./../components/product/Slider";
import Features from './../components/features/Features';
import Categories from './../components/product/Categories';
import Products from './../components/product/Products';

const HomePage = () => {
  const { fetchBrands, fetchCategories, fetchSliders, fetchListByRemark } = useProductStore();
  const { fetchFeatures } = useFeatureStore();

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([fetchBrands(), fetchCategories(), fetchSliders(), fetchListByRemark("new"), fetchFeatures()]);
      } catch (error) {
        console.error(error);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Slider />
      <Features/>
      <Categories/>
      <Products/>
      <Brands />
    </Layout>
  );
};

export default HomePage;
