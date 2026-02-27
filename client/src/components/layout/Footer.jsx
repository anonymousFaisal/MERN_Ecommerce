import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/payment.png";

const Footer = () => {
  return (
    <footer className="footer-section pt-5 pb-3 mt-5 text-light" style={{ backgroundColor: "#1a1f2e" }}>
      {/* Top section */}
      <div className="container py-4">
        <div className="row g-5">
          {/* Brand & Socials */}
          <div className="col-12 col-lg-4">
            <h4 className="fw-bold mb-3 text-white">MERN Shop</h4>
            <p className="text-white-50 mb-4" style={{ lineHeight: "1.6" }}>
              Your premium destination for high-quality electronics and accessories. Experience the best in tech with our curated selection.
            </p>
            <div className="d-flex gap-3 social-links">
              <a
                href="#"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", transition: "all 0.3s" }}
                aria-label="Facebook"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--themeColor)";
                  e.currentTarget.style.borderColor = "var(--themeColor)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--bs-light)";
                }}
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", transition: "all 0.3s" }}
                aria-label="Twitter"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--themeColor)";
                  e.currentTarget.style.borderColor = "var(--themeColor)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--bs-light)";
                }}
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px", transition: "all 0.3s" }}
                aria-label="Instagram"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--themeColor)";
                  e.currentTarget.style.borderColor = "var(--themeColor)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--bs-light)";
                }}
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-sm-6 col-lg-2 offset-lg-1">
            <h5 className="fw-bold mb-4 text-white">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/about"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/how-to-buy"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  How to Buy
                </Link>
              </li>
              <li>
                <Link
                  to="/complain"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  Complain
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-12 col-sm-6 col-lg-2">
            <h5 className="fw-bold mb-4 text-white">Legal Information</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/refund"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  Refund Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white-50 text-decoration-none footer-link"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.classList.add("text-success")}
                  onMouseLeave={(e) => e.currentTarget.classList.remove("text-success")}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Payment */}
          <div className="col-12 col-lg-3">
            <h5 className="fw-bold mb-4 text-white">Stay Updated</h5>
            <p className="text-white-50 small mb-3">Subscribe to our newsletter for exclusive offers and updates.</p>
            <div className="input-group mb-4">
              <input
                type="email"
                className="form-control border-secondary bg-dark text-white rounded-start-pill ps-3"
                placeholder="Email address"
                aria-label="Email address"
              />
              <button
                className="btn btn-outline-secondary text-white border-secondary rounded-end-pill px-3"
                type="button"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--themeColor)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>

            <h6 className="text-white-50 fw-semibold mb-2">Secure Payments</h6>
            <img src={logo} alt="Payment Methods" className="img-fluid bg-white rounded p-1 opacity-75" style={{ maxWidth: "200px" }} />
          </div>
        </div>
      </div>

      <hr className="border-secondary my-4 opacity-50" />

      {/* Bottom bar */}
      <div className="container text-center pt-2">
        <p className="text-white-50 small mb-0">© {new Date().getFullYear()} MERN Shop. Designed with ❤️ by Faisal. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
