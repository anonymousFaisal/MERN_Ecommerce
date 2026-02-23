import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useGetProductListByRemarkQuery } from "../../redux/features/productApi";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";

const Products = () => {
  const [remark, setRemark] = useState("new");
  const { data: listByRemark, isFetching } = useGetProductListByRemarkQuery(remark);

  const renderProducts = () => {
    if (isFetching || !listByRemark) return <ProductsSkeleton />;

    if (!Array.isArray(listByRemark) || listByRemark.length === 0) {
      return <div className="col-12 py-5 text-center text-muted">No products found.</div>;
    }

    return listByRemark.map((item, index) => {
      const hasDiscount = item?.discount === true && item?.discountPrice;
      const priceBlock = hasDiscount ? (
        <p className="bodyMedium text-dark my-1">
          Price: <strike>${item.price}</strike> ${item.discountPrice}
        </p>
      ) : (
        <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>
      );

      return (
        <div key={index} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
          <Link to={`/details/${item._id}`} className="card shadow-sm h-100 rounded-3 bg-white text-decoration-none">
            <img className="w-100 rounded-top-2 p-2" src={item.image} alt={item.title} />
            <div className="card-body">
              <p className="bodySmal text-secondary my-1">{item.title}</p>
              {priceBlock}
              <Rating value={parseFloat(item?.star ?? 0) || 0} readOnly size="medium" precision={0.5} />
            </div>
          </Link>
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
