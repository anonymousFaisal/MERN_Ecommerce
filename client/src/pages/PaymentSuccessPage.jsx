import React from "react";
import Layout from "../components/layout/Layout";
import { Link, useParams } from "react-router-dom";

const PaymentSuccessPage = () => {
  const { trxID } = useParams();

  return (
    <Layout>
      <div className="flex items-center justify-center min-vh-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-sm border-0 rounded-4">
                <div className="card-body p-5 text-center">
                  <div className="mb-4 text-success">
                    <i className="bi bi-check-circle-fill" style={{ fontSize: "80px" }}></i>
                  </div>
                  <h2 className="fw-bold mb-3">Payment Successful!</h2>
                  <p className="text-muted mb-4">Thank you for your purchase. Your payment has been processed successfully.</p>
                  <div className="bg-light p-3 rounded mb-4 d-inline-block shadow-sm">
                    <span className="text-muted d-block small mb-1">Transaction ID</span>
                    <span className="fw-semibold font-monospace">{trxID}</span>
                  </div>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
                    <Link to="/order" className="btn btn-primary px-4 py-2 rounded-3 fw-medium">
                      View Orders
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary px-4 py-2 rounded-3 fw-medium">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
