import React from "react";
import useFeatureStore from "../../store/useFeatureStore";
import FeaturesSkeleton from "../../skeleton/FeaturesSkeleton";

const Features = () => {
  const { featuresList } = useFeatureStore();

  if (featuresList === null) {
    return <FeaturesSkeleton />;
  }

  return (
    <div className="container py-lg-5">
      <div className="row g-3 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {featuresList.map((item, index) => (
          <div key={index} className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4">
              <div className="card-body d-flex align-items-start gap-3">
                <div className="rounded bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 56, height: 56 }}>
                  <img src={item.img} alt={item.name} className="img-fluid" style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain" }} />
                </div>

                <div className="min-w-0">
                  <h3 className="bodyXLarge h6 mb-1 text-truncate">{item.name}</h3>
                  <p className="bodySmal text-muted mb-0" style={{ lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
