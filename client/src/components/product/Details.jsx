import React, { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import ProductImages from "./ProductImages";
import { useGetProductDetailsQuery } from "../../redux/features/productApi";
import ProductDetailSkeleton from "../../skeleton/ProductDetailSkeleton";
import Reviews from "./Reviews";
import CartSubmitButton from "./../cart/CartSubmitButton";
import toast from "react-hot-toast";
import WishSubmitButton from "./../wish/WishSubmitButton";
import { useCreateCartItemMutation } from "../../redux/features/cartApi";
import { useCreateWishItemMutation } from "../../redux/features/wishApi";

const Details = () => {
  const { productID } = useParams();
  const { data: details, isLoading } = useGetProductDetailsQuery(productID);

  const [cartForm, setCartForm] = useState({ color: "", qty: 1, size: "" });
  const cartFormOnChange = (name, value) => {
    setCartForm((prev) => ({ ...prev, [name]: value }));
  };

  const [Quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prev) => {
      const newVal = prev + 1;
      cartFormOnChange("qty", newVal);
      return newVal;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const newVal = prev > 1 ? prev - 1 : 1;
      cartFormOnChange("qty", newVal);
      return newVal;
    });
  };

  const [createCartItem, { isLoading: isCartAdding }] = useCreateCartItemMutation();
  const [createWishItem, { isLoading: isWishAdding }] = useCreateWishItemMutation();

  const addToCart = async (productID) => {
    try {
      const res = await createCartItem({ ...cartForm, productID }).unwrap();
      if (res?.status === "success") {
        toast.success("Product added to cart successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  const addToWish = async (productID) => {
    try {
      const res = await createWishItem({ productID }).unwrap();
      if (res?.status === "success") {
        toast.success("Product added to wishlist successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to wishlist");
    }
  };

  if (isLoading || !details) {
    return <ProductDetailSkeleton />;
  } else {
    return (
      <div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-3">
              <ProductImages details={details} />
            </div>
            <div className="col-12 col-md-5 p-3 d-flex flex-column">
              {/* Badges */}
              <div className="d-flex gap-2 mb-3 mt-md-0 mt-3 align-items-center">
                <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">
                  {details?.category?.categoryName || "Category"}
                </span>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">{details?.brand?.brandName || "Brand"}</span>
                <div className="ms-auto d-flex align-items-center gap-1 text-warning">
                  <i className="bi bi-star-fill"></i>
                  <span className="text-dark fw-bold small">{details?.star || "0"}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h1 className="h2 fw-bold text-dark mb-3">{details.title}</h1>
              <p className="text-muted bodyMedium mb-4" style={{ lineHeight: "1.6" }}>
                {details.shortDes}
              </p>

              {/* Price */}
              <div className="mb-4 p-3 bg-light rounded-4">
                {details.discount === true ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className="h3 fw-bold text-success mb-0">${details.discountPrice}</span>
                    <span className="h5 text-muted text-decoration-line-through mb-0">${details.price}</span>
                    <span className="badge bg-danger rounded-pill px-2 py-1 ms-auto">Sale</span>
                  </div>
                ) : (
                  <span className="h3 fw-bold text-dark mb-0">${details.price}</span>
                )}
              </div>

              {/* Options */}
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted mb-1">Size</label>
                  <select
                    value={cartForm.size}
                    onChange={(e) => cartFormOnChange("size", e.target.value)}
                    className="form-select form-select-lg rounded-3 shadow-none border-secondary-subtle"
                    disabled={!details?.details?.size}
                  >
                    <option value="">Select Size</option>
                    {(details?.details?.size || "")
                      .split(",")
                      .filter((s) => s.trim() !== "")
                      .map((item, index) => (
                        <option key={index} value={item.trim()}>
                          {item.trim()}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold text-muted mb-1">Color</label>
                  <select
                    value={cartForm.color}
                    onChange={(e) => cartFormOnChange("color", e.target.value)}
                    className="form-select form-select-lg rounded-3 shadow-none border-secondary-subtle"
                    disabled={!details?.details?.color}
                  >
                    <option value="">Select Color</option>
                    {(details?.details?.color || "")
                      .split(",")
                      .filter((c) => c.trim() !== "")
                      .map((item, index) => (
                        <option key={index} value={item.trim()}>
                          {item.trim()}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <style>{`
                @media (max-width: 767.98px) {
                  .cart-action-container {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: white;
                    padding: 1rem;
                    box-shadow: 0 -4px 15px rgba(0,0,0,0.1);
                    z-index: 1040;
                    border-top: 1px solid #dee2e6;
                  }
                  .qty-label {
                    display: none;
                  }
                }
              `}</style>

              <div className="cart-action-container mt-auto pt-4 pt-md-2" style={{ zIndex: 1030 }}>
                <div className="d-flex align-items-end gap-2 gap-md-3">
                  <div className="quantity-control" style={{ minWidth: "110px", width: "130px" }}>
                    <label className="form-label small fw-semibold text-muted mb-1 qty-label">Quantity</label>
                    <div className="input-group input-group-lg rounded-3 border overflow-hidden bg-white">
                      <button className="btn btn-light border-0 px-2 px-md-3 fw-bold bg-white" onClick={decrement}>
                        -
                      </button>
                      <input type="text" value={Quantity} className="form-control text-center border-0 bg-transparent fw-bold px-0" readOnly />
                      <button className="btn btn-light border-0 px-2 px-md-3 fw-bold bg-white" onClick={increment}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="d-flex gap-2 flex-grow-1">
                    <CartSubmitButton
                      submit={isCartAdding}
                      className="btn btn-lg btn-success w-100 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() => addToCart(details._id)}
                      text={
                        <>
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </>
                      }
                    />
                    <WishSubmitButton
                      submit={isWishAdding}
                      className="btn btn-lg btn-light border rounded-3 shadow-sm d-flex align-items-center justify-content-center bg-white"
                      style={{ width: "56px", minWidth: "56px" }}
                      onClick={() => addToWish(details._id)}
                      text={<i className="bi bi-heart text-danger"></i>}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 pt-4 border-top">
            <div className="col-12">
              <ul className="nav nav-pills mb-4" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active px-4 py-2 fw-semibold"
                    id="Speci-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Speci-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="Speci-tab-pane"
                    aria-selected="true"
                    style={{ transition: "all 0.3s" }}
                  >
                    Specifications
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link px-4 py-2 fw-semibold text-dark"
                    id="Review-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Review-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="Review-tab-pane"
                    aria-selected="false"
                    style={{ transition: "all 0.3s" }}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content bg-white p-4 rounded-4 shadow-sm" id="myTabContent" style={{ minHeight: "200px" }}>
                <div
                  className="tab-pane fade show active text-muted bodyMedium"
                  id="Speci-tab-pane"
                  role="tabpanel"
                  aria-labelledby="Speci-tab"
                  tabIndex="0"
                  style={{ lineHeight: "1.8" }}
                >
                  {parse(details.details.des)}
                </div>
                <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Details;
