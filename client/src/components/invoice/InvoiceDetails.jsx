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
  const { id: invoiceID } = useParams();
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
  } else if (isLoading || !invoiceDetails) {
    return <CartSkeleton />;
  } else if (invoiceDetails.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <ul className="list-group list-group-flush">
                {invoiceDetails.map((item, i) => {
                  return (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                      <img className="rounded-1" alt="" width="90" height="auto" src={item.product.image} />
                      <div className="ms-2 me-auto">
                        <div className="fw-medium h6">{item.product.title}</div>
                        <span>
                          Unit Price: {item.price}, Total: {item.price * parseInt(item.qty)}
                        </span>
                        <br />
                        <span>
                          Qty: {item.qty}, Size: {item.size}, Color: {item.color}
                        </span>
                      </div>
                      <button onClick={() => ReviewModal(item.productID)} className="btn btn-success">
                        Create Review
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h6>Create Review</h6>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-12 p-2">
                  <label className="form-label">Rating</label>
                  <select onChange={(e) => reviewFormOnChange("rating", e.target.value)} className="form-select">
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div className="col-12 p-2">
                  <label className="form-label">Review</label>
                  <textarea
                    onChange={(e) => reviewFormOnChange("des", e.target.value)}
                    className="form-control"
                    rows={7}
                    value={reviewFormData.des}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark" onClick={handleClose}>
              Close
            </button>
            <ReviewSubmitButton submit={isReviewSubmit} text="Submit" className="btn btn-success" onClick={submitReview} />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default InvoiceDetails;
