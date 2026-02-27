import React from "react";
import { Link } from "react-router-dom";
import { useGetCategoryListQuery } from "../../redux/features/productApi";
import CategoriesSkeleton from "./../../skeleton/CategoriesSkeleton";

const Categories = () => {
  const { data: categoryList, isLoading } = useGetCategoryListQuery();

  if (isLoading || !categoryList) {
    return <CategoriesSkeleton />;
  } else {
    return (
      <section className="categories-section py-5 my-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3 text-dark">Top Categories</h2>
            <p className="bodyLarge text-muted mx-auto" style={{ maxWidth: "600px" }}>
              Explore a World of Choices Across Our Most Popular Shopping Categories
            </p>
          </div>

          <div className="row g-4 justify-content-center stagger-children">
            {categoryList.map((item, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3 animate-fade-in-up">
                <Link
                  to={`/by-category/${item._id}`}
                  className="card text-decoration-none border-0 rounded-4 overflow-hidden position-relative group"
                  style={{
                    aspectRatio: "1/1",
                    boxShadow: "var(--shadow-sm)",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                    const img = e.currentTarget.querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* Image with hover zoom */}
                  <img
                    alt={item.categoryName}
                    className="w-100 h-100"
                    src={item.categoryImg}
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 60%)",
                      pointerEvents: "none",
                    }}
                  ></div>

                  {/* Text Content */}
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 details-container">
                    <h5 className="text-white fw-bold mb-0 text-truncate" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}>
                      {item.categoryName}
                    </h5>
                    <div
                      className="text-warning small mt-1 opacity-0 group-hover-opacity-100 transition-opacity"
                      style={{ transition: "opacity 0.3s ease", opacity: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      Shop Now <i className="bi bi-arrow-right-short align-middle"></i>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Categories;
