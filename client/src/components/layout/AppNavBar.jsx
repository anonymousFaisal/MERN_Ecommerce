import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";

const AppNavBar = () => {
  // Example counts (wire these to state/store later)
  const cartCount = 0;
  const wishCount = 0;

  return (
    <>
      {/* Top contact & social strip */}
      <div className="bg-success text-white py-2">
        <div className="container">
          <div className="row align-items-center g-2">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-wrap gap-3 small">
                <a href="mailto:Support@PlanB.com" className="link-light text-decoration-none">
                  <i className="bi bi-envelope me-1"></i> Support@PlanB.com
                </a>
                <a href="tel:01774688159" className="link-light text-decoration-none">
                  <i className="bi bi-phone me-1"></i> 01774688159
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex gap-3 justify-content-md-end small">
                <a href="#" aria-label="WhatsApp" className="link-light">
                  <i className="bi bi-whatsapp fs-5"></i>
                </a>
                <a href="#" aria-label="YouTube" className="link-light">
                  <i className="bi bi-youtube fs-5"></i>
                </a>
                <a href="#" aria-label="Facebook" className="link-light">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="PlanB" width="96" height="auto" className="img-fluid" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav06">
            {/* Left nav links */}
            <ul className="navbar-nav ms-lg-3 me-auto my-3 my-lg-0">
              <li className="nav-item me-lg-2">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </li>
              {/* Add more:
              <li className="nav-item"><NavLink className="nav-link" to="/shop">Shop</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
              */}
            </ul>

            {/* Search + actions */}
            <div className="d-flex align-items-center gap-2">
              <form className="input-group" role="search" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                <button className="btn btn-outline-dark" type="submit" aria-label="Search">
                  <i className="bi bi-search"></i>
                </button>
              </form>

              <Link to="/cart" className="btn btn-light position-relative" aria-label="Cart">
                <i className="bi bi-bag fs-5 text-dark"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>

              <Link to="/wish" className="btn btn-light position-relative" aria-label="Wishlist">
                <i className="bi bi-heart fs-5 text-dark"></i>
                {wishCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishCount}
                    <span className="visually-hidden">items in wishlist</span>
                  </span>
                )}
              </Link>

              <Link className="btn btn-success" to="/profile">
                Profile
              </Link>

              {/* If you have auth state, conditionally render Login/Logout */}
              <Link className="btn btn-outline-dark" to="/logout">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
