import React from "react";
import useFeatureStore from "../../store/useFeatureStore";
import FeaturesSkeleton from "../../skeleton/FeaturesSkeleton";

const Features = () => {
  const { featuresList } = useFeatureStore();

  if (featuresList === null) {
    return <FeaturesSkeleton />;
  } else {
    return (
      <div className="container section">
        <div className="row">
          {featuresList.map((item, index) => {
            return (
              <div key={index} className="col-6 p-2 col-md-2 col-lg-3 col-sm-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        <img className="w-100" src={item.img} />
                      </div>
                      <div className="col-9">
                        <h3 className="bodyXLarge">{item.name}</h3>
                        <span className="bodySmal">{item.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Features;
