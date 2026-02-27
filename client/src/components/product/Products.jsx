import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useGetProductListByRemarkQuery } from "../../redux/features/productApi";
import { useCreateWishItemMutation } from "../../redux/features/wishApi";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import toast from "react-hot-toast";

const Products = () => {
  const [remark, setRemark] = useState("new");
  const { data: listByRemark, isFetching } = useGetProductListByRemarkQuery(remark);
  const [createWishItem] = useCreateWishItemMutation();
  const navigate = useNavigate();

  const handleWishlist = async (productID) => {
    try {
      const res = await createWishItem({ productID });
      if (res?.data?.status === "success") {
        toast.success("Added to Wishlist");
      } else {
        toast.error("Please login first");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  const renderProducts = () => {
    if (isFetching || !listByRemark) return <ProductsSkeleton />;

    if (!Array.isArray(listByRemark) || listByRemark.length === 0) {
      return <div className="col-12 py-5 text-center text-muted">No products found.</div>;
    }

    return listByRemark.map((item, index) => {
      const hasDiscount = item?.discount === true && item?.discountPrice;
      const priceBlock = hasDiscount ? (
        <div className="d-flex align-items-center gap-2 mb-2">
          <span className="h5 mb-0 fw-bold text-success">${item.discountPrice}</span>
          <span className="text-muted text-decoration-line-through small">${item.price}</span>
        </div>
      ) : (
        <div className="d-flex align-items-center mb-2">
          <span className="h5 mb-0 fw-bold text-dark">${item.price}</span>
        </div>
      );

      return (
        <div key={index} className="col-md-4 col-lg-3 col-sm-6 col-12 animate-fade-in-up">
          <div
            className="card h-100 border-0 rounded-4 position-relative group"
            style={{ boxShadow: "var(--shadow-sm)", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
              const img = e.currentTarget.querySelector(".product-image");
              if (img) img.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              const img = e.currentTarget.querySelector(".product-image");
              if (img) img.style.transform = "scale(1)";
            }}
          >
            {/* Image Wrapper for Zoom Effect */}
            <Link
              to={`/details/${item._id}`}
              className="position-relative overflow-hidden rounded-top-4 d-block bg-light"
              style={{ aspectRatio: "1/1" }}
            >
              <img
                className="product-image w-100 h-100 p-4"
                src={item.image}
                alt={item.title}
                style={{ objectFit: "contain", transition: "transform 0.5s ease" }}
              />

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="position-absolute top-0 start-0 m-3 px-2 py-1 bg-danger text-white rounded-2 small fw-bold" style={{ zIndex: 2 }}>
                  Sale
                </div>
              )}
            </Link>

            {/* Wishlist Button */}
            <button
              className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
              style={{ width: "38px", height: "38px", zIndex: 2, transition: "all 0.2s" }}
              onClick={(e) => {
                e.preventDefault();
                handleWishlist(item._id);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--themeColor)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "inherit";
                e.currentTarget.style.transform = "scale(1)";
              }}
              aria-label="Add to wishlist"
            >
              <i className="bi bi-heart fs-5"></i>
            </button>

            <Link to={`/details/${item._id}`} className="card-body d-flex flex-column text-decoration-none">
              <h5 className="bodyMedium text-dark mb-2 text-truncate" title={item.title}>
                {item.title}
              </h5>
              <div className="mt-auto">
                <div className="mb-2">
                  <Rating value={parseFloat(item?.star ?? 0) || 0} readOnly size="small" precision={0.5} />
                </div>
                {priceBlock}
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  const tabs = ["new", "trending", "popular", "top", "special"];

  return (
    <div className="section">
      <div className="container-fluid py-5 bg-light">
        <div className="row">
          <h1 className="headline-5 text-center my-2 p-0">Our Products</h1>
          <span className="bodyMedium mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>

          <div className="col-12">
            {/* Nav Tabs */}
            <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist">
              {tabs.map((tab) => (
                <li className="nav-item" role="presentation" key={tab}>
                  <button
                    onClick={() => setRemark(tab)}
                    className={`nav-link text-capitalize ${remark === tab ? "active" : ""}`}
                    type="button"
                    role="tab"
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="pills-tabContent">
              {/* New */}
              <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby="pills-new-tab" tabIndex="0">
                <div className="container">
                  <div className="row">{renderProducts()}</div>
                </div>
              </div>

              {/* Trending */}
              <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pills-trending-tab" tabIndex="0">
                <div className="container">
                  <div className="row">{renderProducts()}</div>
                </div>
              </div>

              {/* Popular */}
              <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-popular-tab" tabIndex="0">
                <div className="container">
                  <div className="row">{renderProducts()}</div>
                </div>
              </div>

              {/* Top */}
              <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-top-tab" tabIndex="0">
                <div className="container">
                  <div className="row">{renderProducts()}</div>
                </div>
              </div>

              {/* Special */}
              <div className="tab-pane fade" id="pills-special" role="tabpanel" aria-labelledby="pills-special-tab" tabIndex="0">
                <div className="container">
                  <div className="row">{renderProducts()}</div>
                </div>
              </div>
            </div>
            {/* End Tab Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
