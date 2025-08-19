import React from "react";
import useFeatureStore from "../../store/useFeatureStore";
import FeaturesSkeleton from "./../../skeleton/FeaturesSkeleton";

const Features = () => {
  const { featureList } = useFeatureStore();

  if (featureList === null) {
    return <FeaturesSkeleton />;
  } else {
    return <div></div>;
  }
};

export default Features;
