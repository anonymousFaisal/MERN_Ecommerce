import React from "react";
import useProductStore from "../../store/useProductStore";
import BrandsSkeleton from "./../../skeleton/BrandsSkeleton";

const Brands = () => {
  const { brandList } = useProductStore();

  if (brandList === null) {
    return <BrandsSkeleton />;
  } else {
    return <div></div>;
  }
};

export default Brands;
