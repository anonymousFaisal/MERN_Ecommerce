import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useReviewStore from "../../store/useReviewStore";
import useCartStore from "../../store/useCartStore";
import { useParams } from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper";
import toast from "react-hot-toast";
import useUserStore from "../../store/useUserStore";
import CartSkeleton from "../../skeleton/CartSkeleton";
import NoData from "../layout/NoData";
import { Modal } from "react-bootstrap";
import ReviewSubmitButton from "./ReviewSubmitButton";

const InvoiceDetails = () => {
  let { reviewFormData, reviewFormOnChange, fetchSaveReview } = useReviewStore();
  let { fetchInvoiceDetails, invoiceDetails } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const { invoiceID } = useParams();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const ReviewModal = (productID) => {
    setShow(true);
    reviewFormOnChange("productID", productID);
  };

  useEffect(() => {
    (async () => {
      await fetchInvoiceDetails(invoiceID);
    })();
  }, [invoiceID, fetchInvoiceDetails]);

  const submitReview = async () => {
    if (ValidationHelper.IsEmpty(reviewFormData.des)) {
      toast.error("Review Required");
    } else {
      let res = await fetchSaveReview(reviewFormData);
      res ? toast.success("New Review Created") : toast.error("Something Went Wrong !");
      setShow(false);
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
  } else if (invoiceDetails === null) {
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
                  <textarea onChange={(e) => reviewFormOnChange("des", e.target.value)} className="form-control" rows={7} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark" onClick={handleClose}>
              Close
            </button>
            <ReviewSubmitButton text="Submit" className="btn btn-success" onClick={submitReview} />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};

export default InvoiceDetails;