import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductListByCategoryQuery } from "../redux/features/productApi";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";

const ProductByCategory = () => {
  const { categoryID } = useParams();
  const { data: listProduct, isFetching } = useGetProductListByCategoryQuery(categoryID);

  return (
    <Layout>
      <ProductList defaultProducts={listProduct} defaultFetching={isFetching} />
    </Layout>
  );
};

export default ProductByCategory;
