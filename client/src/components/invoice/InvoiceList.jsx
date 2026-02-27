import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartSkeleton from "../../skeleton/CartSkeleton";
import NoData from "../layout/NoData";
import { useGetInvoiceListQuery } from "../../redux/features/cartApi";

const InvoiceList = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { data: invoiceList, isLoading } = useGetInvoiceListQuery(undefined, { skip: !isLoggedIn });

  // Extract the array from API response: { status, data: [...] }
  const items = Array.isArray(invoiceList) ? invoiceList : invoiceList?.data;

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
          <div
            className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="bi bi-receipt fs-4"></i>
          </div>
          <h4 className="fw-bold mb-0 text-dark">Order History</h4>
        </div>

        <div className="row g-4">
          {items.map((item, i) => {
            const isPaid = item.payment_status?.toLowerCase() === "success";
            const isDelivered = item.delivery_status?.toLowerCase() === "delivered";

            return (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
                  style={{ transition: "transform 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* Card Header styling */}
                  <div className="bg-light p-3 border-bottom d-flex justify-content-between align-items-center">
                    <span className="text-muted small fw-semibold">
                      <i className="bi bi-hash"></i> {item.tran_id}
                    </span>
                    <span className={`badge ${isPaid ? "bg-success" : "bg-warning text-dark"} rounded-pill px-3 py-2 shadow-sm`}>
                      {isPaid ? "Paid" : "Pending"}
                    </span>
                  </div>

                  <div className="card-body p-4">
                    <div className="mb-3">
                      <p className="mb-1 text-muted small text-uppercase fw-bold tracking-wider">Customer</p>
                      <p className="mb-0 fw-medium text-dark">{item.cus_details}</p>
                    </div>
                    <div className="mb-4">
                      <p className="mb-1 text-muted small text-uppercase fw-bold tracking-wider">Shipping</p>
                      <p className="mb-0 text-dark small" style={{ lineHeight: "1.5" }}>
                        {item.ship_details}
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                      <div>
                        <span className="text-muted small d-block mb-1">Status</span>
                        <span className={`text-${isDelivered ? "success" : "primary"} fw-semibold small d-flex align-items-center gap-1`}>
                          <i className={`bi bi-${isDelivered ? "check-circle-fill" : "truck"}`}></i>
                          {item.delivery_status}
                        </span>
                      </div>
                      <Link className="btn btn-outline-success rounded-pill px-4 fw-semibold shadow-sm" to={`/invoice/${item._id}`}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default InvoiceList;
