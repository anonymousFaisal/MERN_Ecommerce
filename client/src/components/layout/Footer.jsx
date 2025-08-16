import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/payment.png";

const Footer = () => {
  return (
    <footer>
      {/* Top section */}
      <div className="section-bottom shadow-sm bg-white">
        <div className="container py-5">
          <div className="row g-4">
            {/* Legals */}
            <div className="col-12 col-md-4">
              <h5 className="fw-bold mb-3">Legals</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/about">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/refund">
                    Refund Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/terms">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="col-12 col-md-4">
              <h5 className="fw-bold mb-3">Information</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/how-to-buy">
                    How to Buy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="nav-link p-0" to="/complain">
                    Complain
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="col-12 col-md-4">
              <h5 className="fw-bold mb-3">About</h5>
              <p className="text-muted mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum</p>
              <img src={logo} alt="Payment Methods" className="img-fluid mt-2" style={{ maxWidth: "200px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-dark py-3 text-center">
        <p className="text-white-50 small mb-0">© {new Date().getFullYear()} PlanB. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
