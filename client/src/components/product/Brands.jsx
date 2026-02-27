import React from "react";
import { Link } from "react-router-dom";
import { useGetBrandListQuery } from "../../redux/features/productApi";
import BrandsSkeleton from "./../../skeleton/BrandsSkeleton";

const Brands = () => {
  const { data: brandList, isLoading } = useGetBrandListQuery();

  if (isLoading || !brandList) {
    return <BrandsSkeleton />;
  } else {
    return (
      <section className="brands-section py-5 my-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3 text-dark">Top Brands</h2>
            <p className="bodyLarge text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Explore Our Curated Selection of Premium Partners
            </p>
          </div>
          <div className="row justify-content-center g-4 stagger-children">
            {brandList.map((item, index) => (
              <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2 animate-fade-in-up">
                <Link
                  to={`/by-brand/${item._id}`}
                  className="card h-100 border-0 bg-light text-decoration-none d-flex flex-column align-items-center justify-content-center p-4 group"
                  style={{ transition: "background-color 0.3s ease, border-radius 0.3s ease", borderRadius: "1rem" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--themeColorVeryLight)";
                    const img = e.currentTarget.querySelector("img");
                    if (img) {
                      img.style.filter = "grayscale(0%)";
                      img.style.transform = "scale(1.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--bgLight)";
                    const img = e.currentTarget.querySelector("img");
                    if (img) {
                      img.style.filter = "grayscale(100%)";
                      img.style.transform = "scale(1)";
                    }
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center mb-3" style={{ height: "80px", width: "100%" }}>
                    <img
                      alt={item.brandName}
                      className="img-fluid"
                      src={item.brandImg}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        filter: "grayscale(100%)",
                        transition: "all 0.4s ease",
                      }}
                    />
                  </div>
                  <p className="bodyMedium fw-semibold text-dark mb-0 text-center text-truncate w-100">{item.brandName}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Brands;
