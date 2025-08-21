import React from "react";
import { useState } from "react";
import parse from "html-react-parser";
import ProductImages from "./ProductImages";
import useProductStore from "../../store/useProductStore";
import ProductDetailSkeleton from "../../skeleton/ProductDetailSkeleton";

const Details = () => {
  const { details } = useProductStore();
  const [Quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (details === null) {
    return <ProductDetailSkeleton />;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImages />
            </div>
            <div className="col-md-5 p-3">
              <h4>{details.title}</h4>
              <p className="text-muted bodySmal my-1">Category : {details.category.categoryName}</p>
              <p className="text-muted bodySmal my-1">Brand: {details.brand.brandName}</p>
              <p className="bodySmal mb-2 mt-1">{details.shortDes}</p>
              {details.discount === true ? (
                <span className="bodyXLarge">
                  Price : <strike className="text-secondary">{details.price}</strike> <b>{details.discountPrice}</b>
                </span>
              ) : (
                <span className="bodyXLarge">
                  Price : <b>{details.price}</b>
                </span>
              )}
              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Size</option>
                    {details.details.size.split(",").map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Color</label>
                  <select className="form-control my-2 form-select">
                    <option value="">Color</option>
                    {details.details.color.split(",").map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4 p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    <button className="btn btn-outline-secondary" onClick={decrement}>
                      -
                    </button>
                    <input type="text" value={Quantity} className="form-control bg-light text-center" readOnly />
                    <button className="btn btn-outline-secondary" onClick={increment}>
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Cart</button>
                </div>
                <div className="col-4 p-2">
                  <button className="btn w-100 btn-success">Add to Wish</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="Speci-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Speci-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Speci-tab-pane"
                  aria-selected="true"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="Review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Review-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Review-tab-pane"
                  aria-selected="false"
                >
                  Review
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci-tab" tabIndex="0">
                {
                    parse(details.details.des)
                }
              </div>
              <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                <ul className="list-group list-group-flush"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
