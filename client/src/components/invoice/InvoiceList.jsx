import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartSkeleton from "../../skeleton/CartSkeleton";
import NoData from "../layout/NoData";
import { useGetInvoiceListQuery } from "../../redux/features/cartApi";

const InvoiceList = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { data: invoiceList, isLoading } = useGetInvoiceListQuery(undefined, { skip: !isLoggedIn });

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
  } else if (isLoading || !invoiceList) {
    return <CartSkeleton />;
  } else if (invoiceList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <ul className="list-group list-group-flush">
                {invoiceList.map((item, i) => {
                  return (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="">
                          <p className="m-1">
                            <b>Invoice No:</b> {item.tran_id}
                          </p>
                          <p className="m-1">
                            <b>Customer:</b> {item.cus_details}
                          </p>
                          <p className="m-1">
                            <b>Shipping:</b> {item.ship_details}
                          </p>
                          <p className="m-1">
                            <b>Payment:</b> {item.payment_status}
                          </p>
                          <p className="m-1">
                            <b>Delivery:</b> {item.delivery_status}
                          </p>
                        </div>
                      </div>
                      <Link className="btn btn-success" to={`/invoice/${item._id}`}>
                        Details
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default InvoiceList;
