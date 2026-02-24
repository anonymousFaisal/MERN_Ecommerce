import React from "react";
import { Link } from "react-router-dom";
import { useGetSliderListQuery } from "../../redux/features/productApi";
import SliderSkeleton from "./../../skeleton/SliderSkeleton";

const Slider = () => {
  const { data: sliderList, isLoading } = useGetSliderListQuery();

  if (isLoading || !sliderList) {
    return <SliderSkeleton />;
  }

  return (
    <div className="hero-section position-relative">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators mb-4 pb-2">
          {sliderList.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
              style={{ width: "12px", height: "12px", borderRadius: "50%", margin: "0 6px" }}
            ></button>
          ))}
        </div>

        {/* Inner Slides */}
        <div
          className="carousel-inner"
          style={{ background: "linear-gradient(135deg, var(--themeColorDark) 0%, var(--darkSoft) 100%)", minHeight: "80vh" }}
        >
          {/* Optional graphical overlay */}
          <div className="position-absolute w-100 h-100 hero-bg" style={{ opacity: 0.3, zIndex: 0 }}></div>

          {sliderList.map((item, index) => {
            const isActive = index === 0;
            return (
              <div key={index} className={`carousel-item ${isActive ? "active" : ""}`} data-bs-interval="6000">
                <div className="container position-relative" style={{ zIndex: 1, minHeight: "80vh", display: "flex", alignItems: "center" }}>
                  <div className="row align-items-center w-100">
                    {/* Text Content */}
                    <div className="col-12 col-lg-6 col-md-6 p-5 text-white">
                      <div className="stagger-children">
                        <h1 className="display-3 fw-bold mb-3 animate-fade-in-up" style={{ lineHeight: 1.1 }}>
                          {item.title}
                        </h1>
                        <h2 className="h2 fw-semibold text-warning mb-4 animate-fade-in-up">{item.price}</h2>
                        <p className="bodyLarge mb-5 text-white-50 animate-fade-in-up" style={{ maxWidth: "500px" }}>
                          {item.des}
                        </p>
                        <div className="animate-fade-in-up" style={{ animationDelay: "240ms" }}>
                          <Link
                            to={`/details/${item.productID}`}
                            className="btn btn-lg rounded-pill shadow-lg px-5 py-3 border-0 fw-bold"
                            style={{
                              background: "linear-gradient(90deg, var(--themeColor) 0%, var(--themeLightColor) 100%)",
                              color: "#fff",
                              transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-3px)";
                              e.currentTarget.style.boxShadow = "0 10px 25px rgba(33, 191, 115, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                            }}
                          >
                            Shop Now <i className="bi bi-arrow-right ms-2"></i>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Image Content */}
                    <div className="col-12 col-lg-6 col-md-6 p-5 text-center">
                      <img
                        src={item.image}
                        className="img-fluid animate-scale-in drop-shadow-2xl"
                        alt={item.title}
                        style={{ maxHeight: "500px", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
          style={{ width: "8%", opacity: 1 }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{
              width: "52px",
              height: "52px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
          >
            <i className="bi bi-chevron-left text-white fs-4 ms-1"></i>
          </div>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
          style={{ width: "8%", opacity: 1 }}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle shadow"
            style={{
              width: "52px",
              height: "52px",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
          >
            <i className="bi bi-chevron-right text-white fs-4 me-1"></i>
          </div>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
