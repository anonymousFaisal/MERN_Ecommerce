import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NoData from "../layout/NoData";
import CartSkeleton from "../../skeleton/CartSkeleton";
import Modal from "react-bootstrap/Modal";
import ReviewSubmitButton from "./ReviewSubmitButton";
import ValidationHelper from "../../utility/ValidationHelper";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useGetInvoiceDetailsQuery } from "../../redux/features/cartApi";
import { useCreateReviewMutation } from "../../redux/features/reviewApi";

const InvoiceDetails = () => {
  const { invoiceID } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const { data: invoiceDetails, isLoading } = useGetInvoiceDetailsQuery(invoiceID, { skip: !isLoggedIn });
  const [createReview, { isLoading: isReviewSubmit }] = useCreateReviewMutation();

  const [reviewFormData, setReviewFormData] = useState({ des: "", rating: "5", productID: "" });
  const reviewFormOnChange = (name, value) => {
    setReviewFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const ReviewModal = (productID) => {
    setShow(true);
    reviewFormOnChange("productID", productID);
  };

  const submitReview = async () => {
    if (ValidationHelper.IsEmpty(reviewFormData.des)) {
      toast.error("Review Required");
    } else {
      try {
        const res = await createReview(reviewFormData).unwrap();
        if (res?.status === "success") {
          toast.success("New Review Created");
          setShow(false);
          setReviewFormData({ des: "", rating: "5", productID: "" });
        } else {
          toast.error("Something Went Wrong !");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to submit review");
      }
    }
  };

  // Extract the array from API response: { status, data: [...] }
  const items = Array.isArray(invoiceDetails) ? invoiceDetails : invoiceDetails?.data;

  if (!isLoggedIn) {
    return (
      <div className="container mt-3 text-center">
        <NoData />
        <div className="card rounded-5 shadow-sm border-0 mt-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body text-center p-4">
            <h4 className="text-danger mb-3">Please login</h4>
            <p className="text-muted mb-4">You need to login to check your invoices.</p>
            <Link to="/login" className="btn btn-success btn-xl px-4">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (isLoading || !items || !Array.isArray(items)) {
    return <CartSkeleton />;
  } else if (items.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-4 mb-5">
        <div className="d-flex align-items-center mb-4">
          <Link
            to="/profile"
            className="btn btn-light rounded-circle text-muted p-2 me-3 shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="bi bi-arrow-left"></i>
          </Link>
          <div>
            <h4 className="fw-bold mb-1 text-dark">Invoice Details</h4>
            <p className="text-muted small mb-0">View your purchased items and leave a review</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-light border-bottom p-4">
                <h6 className="fw-bold mb-0 text-dark">Purchased Items</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-borderless align-middle mb-0">
                    <thead className="bg-light text-uppercase small text-muted">
                      <tr>
                        <th className="px-4 py-3 fw-semibold">Product</th>
                        <th className="px-4 py-3 fw-semibold">Variations</th>
                        <th className="px-4 py-3 fw-semibold text-end">Price</th>
                        <th className="px-4 py-3 fw-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, i) => {
                        return (
                          <tr key={i} className="border-bottom">
                            <td className="px-4 py-4">
                              <div className="d-flex align-items-center gap-3">
                                <div
                                  className="bg-light rounded-3 d-flex align-items-center justify-content-center p-1"
                                  style={{ width: "80px", height: "80px" }}
                                >
                                  <img
                                    className="rounded-2"
                                    alt={item.product?.title}
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                                    src={item.product?.image || "https://placehold.co/600x600/f8f9fa/adb5bd?text=No+Image"}
                                  />
                                </div>
                                <div>
                                  <h6
                                    className="fw-bold text-dark mb-1"
                                    style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                  >
                                    {item.product?.title || "Unknown Product"}
                                  </h6>
                                  <p className="small text-muted mb-0">
                                    Qty: <span className="fw-semibold text-dark">{item.qty}</span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 align-middle">
                              <div className="d-flex flex-column gap-1">
                                {item.color && (
                                  <span className="badge bg-light text-dark border fw-normal px-2 py-1 align-self-start">
                                    Color: <span className="fw-semibold">{item.color}</span>
                                  </span>
                                )}
                                {item.size && (
                                  <span className="badge bg-light text-dark border fw-normal px-2 py-1 align-self-start">
                                    Size: <span className="fw-semibold">{item.size}</span>
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 align-middle text-end">
                              <div className="d-flex flex-column">
                                <span className="h6 fw-bold text-success mb-0">${item.price * parseInt(item.qty)}</span>
                                <span className="small text-muted">${item.price} each</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 align-middle text-center">
                              <button
                                onClick={() => ReviewModal(item.productID)}
                                className="btn btn-sm btn-outline-warning rounded-pill px-3 fw-semibold shadow-sm d-inline-flex align-items-center gap-2 text-dark"
                              >
                                <i className="bi bi-star-fill text-warning"></i> Review
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose} centered contentClassName="border-0 rounded-4 shadow-lg">
          <Modal.Header closeButton className="border-bottom-0 pb-0 pt-4 px-4">
            <Modal.Title className="h5 fw-bold">
              <i className="bi bi-star-half text-warning me-2"></i>Write a Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4 py-4">
            <div className="mb-4">
              <label className="form-label small fw-semibold text-muted mb-2">Overall Rating</label>
              <select
                onChange={(e) => reviewFormOnChange("rating", e.target.value)}
                className="form-select form-select-lg rounded-3 shadow-none border-secondary-subtle"
              >
                <option value="5">Excellent (5 Stars)</option>
                <option value="4">Very Good (4 Stars)</option>
                <option value="3">Average (3 Stars)</option>
                <option value="2">Poor (2 Stars)</option>
                <option value="1">Terrible (1 Star)</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label small fw-semibold text-muted mb-2">Your Experience</label>
              <textarea
                onChange={(e) => reviewFormOnChange("des", e.target.value)}
                className="form-control rounded-3 shadow-none border-secondary-subtle p-3"
                rows={5}
                value={reviewFormData.des}
                placeholder="What did you like or dislike? How does it fit?"
                style={{ resize: "none" }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0 pb-4 px-4">
            <button className="btn btn-light rounded-pill px-4 fw-semibold" onClick={handleClose}>
              Cancel
            </button>
            <ReviewSubmitButton
              submit={isReviewSubmit}
              text={
                <>
                  Submit Review <i className="bi bi-send ms-1"></i>
                </>
              }
              className="btn btn-warning text-dark rounded-pill px-4 fw-semibold shadow-sm"
              onClick={submitReview}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default InvoiceDetails;
