import React from "react";
import { useGetFeaturesListQuery } from "../../redux/features/featureApi";
import FeaturesSkeleton from "../../skeleton/FeaturesSkeleton";

const Features = () => {
  const { data: featuresList, isLoading } = useGetFeaturesListQuery();

  if (isLoading || !featuresList) {
    return <FeaturesSkeleton />;
  }

  return (
    <section className="features-section py-5 my-5 position-relative" style={{ backgroundColor: "var(--bgLight)" }}>
      {/* Decorative top border line */}
      <div
        className="position-absolute top-0 start-0 w-100"
        style={{ height: "4px", background: "linear-gradient(90deg, var(--themeColor) 0%, var(--accentColor) 100%)" }}
      ></div>

      <div className="container py-lg-4 z-1 position-relative">
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-4 stagger-children">
          {featuresList.map((item, index) => (
            <div key={index} className="col animate-fade-in-up">
              <div
                className="card h-100 border-0 rounded-4"
                style={{
                  background: "var(--bgWhite)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div className="card-body p-4 d-flex align-items-center gap-4">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      background: "var(--themeColorVeryLight)",
                      color: "var(--themeColor)",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1) rotate(5deg)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) rotate(0deg)")}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="img-fluid"
                      style={{ maxWidth: "60%", maxHeight: "60%", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(33,191,115,0.2))" }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="bodyLarge fw-bold mb-1 text-dark text-truncate">{item.name}</h3>
                    <p className="bodySmal text-muted mb-0" style={{ lineHeight: 1.5 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
