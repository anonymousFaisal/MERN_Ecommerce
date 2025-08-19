import React from "react";
import useProductStore from "../../store/useProductStore";
import SliderSkeleton from './../../skeleton/SliderSkeleton';

const Slider = () => {
  const { sliderList } = useProductStore();

  if (sliderList === null) {
    return <SliderSkeleton/>;
  } else {
    return <div></div>;
  }
};

export default Slider;
