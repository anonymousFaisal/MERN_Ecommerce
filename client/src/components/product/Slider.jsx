import React from "react";
import { Link } from "react-router-dom";
import { useGetSliderListQuery } from "../../redux/features/productApi";
import SliderSkeleton from "./../../skeleton/SliderSkeleton";

const Slider = () => {
  const { data: sliderList, isLoading } = useGetSliderListQuery();

  if (isLoading || !sliderList) {
    return <SliderSkeleton />;
  } else {
    return (
      <div>
        <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
          <div className="carousel-indicators">
            {sliderList.map((item, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className="active"
                  aria-current="true"
                  aria-label=""
                ></button>
              );
            })}
          </div>
          <div className="carousel-inner py-4">
            {sliderList.map((item, index) => {
              const active = index === 0 ? "carousel-item active" : "carousel-item";
              return (
                <div key={index} className={active} data-bs-interval="10000">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        <h1 className="display-4 fw-bold text-white">{item.title}</h1>
                        <h2 className="h2 fw-semibold  mt-2">{item.price}</h2>
                        <p className="bodyMedium my-5">{item.des}</p>
                        <Link
                          to={`/details/${item.productID}`}
                          className="btn btn-lg rounded-pill shadow text-white btn-dark btn-outline-success px-5"
                        >
                          Buy Now
                        </Link>
                      </div>
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        <img src={item.image} className="w-100" alt="..." />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
};

export default Slider;
