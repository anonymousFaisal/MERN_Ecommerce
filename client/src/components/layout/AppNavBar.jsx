import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/plainb-logo.svg";
import UserSubmitButton from "../user/UserSubmitButton";
import { setAuthStatus } from "../../redux/features/userSlice";
import { useUserLogoutMutation } from "../../redux/features/userApi";
import { useGetCartListQuery } from "../../redux/features/cartApi";
import { useGetWishListQuery } from "../../redux/features/wishApi";
import { baseApi } from "../../redux/api/baseApi";

const AppNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [userLogout, { isLoading: isLogoutLoading }] = useUserLogoutMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cartData } = useGetCartListQuery(undefined, { skip: !isLoggedIn });
  const { data: wishData } = useGetWishListQuery(undefined, { skip: !isLoggedIn });

  const cartCount = cartData?.length || 0;
  const wishCount = wishData?.length || 0;

  const onSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || "").trim();
    if (q.length > 0) {
      navigate(`/by-search/${encodeURIComponent(q)}`);
    } else {
      navigate("/");
    }
  };

  const onLogOut = async () => {
    await userLogout();
    sessionStorage.clear();
    localStorage.clear();
    dispatch(setAuthStatus(false));
    dispatch(baseApi.util.resetApiState());
    navigate("/");
  };

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
            <img src={logo} alt="PlanB" width="96" className="img-fluid" />
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
            <ul className="navbar-nav ms-lg-3 me-auto my-3 my-lg-0 d-flex flex-row gap-2">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `btn border rounded-3 d-inline-flex align-items-center px-3 py-2 ${isActive ? "btn-success text-white" : "btn-light text-dark"}`
                  }
                >
                  <i className="bi bi-house-door me-2"></i>
                  <span className="fw-semibold">Home</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  aria-label="Cart"
                  className={({ isActive }) =>
                    `btn position-relative d-inline-flex align-items-center rounded-3 px-3 py-2 ${
                      isActive ? "btn-success text-white" : "btn-light text-dark border"
                    }`
                  }
                >
                  <i className="bi bi-bag me-2"></i>
                  Cart
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                      {cartCount}
                      <span className="visually-hidden">items in cart</span>
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/wish"
                  aria-label="Wishlist"
                  className={({ isActive }) =>
                    `btn position-relative d-inline-flex align-items-center rounded-3 px-3 py-2 ${
                      isActive ? "btn-success text-white" : "btn-light text-dark border"
                    }`
                  }
                >
                  <i className="bi bi-heart me-2"></i>
                  Wish
                  {wishCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishCount}
                      <span className="visually-hidden">items in wishlist</span>
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/order"
                  aria-label="Orders"
                  className={({ isActive }) =>
                    `btn position-relative d-inline-flex align-items-center rounded-3 px-3 py-2 ${
                      isActive ? "btn-success text-white" : "btn-light text-dark border"
                    }`
                  }
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Orders
                </NavLink>
              </li>
            </ul>

            {/* Search + actions */}
            <div className="d-flex align-items-center gap-2">
              <form className="input-group" role="search" onSubmit={onSubmit}>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  type="search"
                  placeholder="Search products..."
                />
                <button className="btn btn-outline-dark" type="submit" aria-label="Search">
                  <i className="bi bi-search"></i>
                </button>
              </form>

              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `btn d-inline-flex align-items-center rounded-3 px-3 py-2 ${isActive ? "btn-success text-white" : "btn-light text-dark border"}`
                    }
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    Profile
                  </NavLink>

                  <UserSubmitButton
                    submit={isLogoutLoading}
                    onClick={onLogOut}
                    text="Logout"
                    className="btn btn-outline-dark rounded-3 d-inline-flex align-items-center px-3 py-2"
                  />
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `btn d-inline-flex align-items-center rounded-3 px-3 py-2 ${isActive ? "btn-success text-white" : "btn-light text-dark border"}`
                    }
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
