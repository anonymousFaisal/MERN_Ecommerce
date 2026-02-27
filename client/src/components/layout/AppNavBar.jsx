import React, { useState, useEffect } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: cartData } = useGetCartListQuery(undefined, { skip: !isLoggedIn });
  const { data: wishData } = useGetWishListQuery(undefined, { skip: !isLoggedIn });

  const cartCount = cartData?.length || 0;
  const wishCount = wishData?.length || 0;

  // Glassmorphism scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || "").trim();
    if (q.length > 0) {
      navigate(`/by-search/${encodeURIComponent(q)}`);
    } else {
      navigate("/");
    }
    setMobileOpen(false);
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
    <header className={`site-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src={logo} alt="PlanB" />
          </Link>

          {/* Mobile hamburger */}
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
          </button>

          {/* Collapsible area */}
          <div className={`nav-collapse ${mobileOpen ? "open" : ""}`}>
            {/* Nav Links */}
            <ul className="nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
                  <i className="bi bi-house-door"></i>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/order" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
                  <i className="bi bi-box-seam"></i>
                  Orders
                </NavLink>
              </li>
            </ul>

            {/* Right side actions */}
            <div className="nav-actions">
              {/* Search */}
              <form className="nav-search" role="search" onSubmit={onSubmit}>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search products..." />
                <i className="bi bi-search nav-search-icon"></i>
              </form>

              {/* Icon group: Cart & Wishlist */}
              <div className="nav-icon-group" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => `nav-icon-link ${isActive ? "active" : ""}`}
                  aria-label="Cart"
                  onClick={() => setMobileOpen(false)}
                >
                  <i className="bi bi-bag"></i>
                  {cartCount > 0 && (
                    <span className="nav-badge" key={cartCount}>
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/wish"
                  className={({ isActive }) => `nav-icon-link ${isActive ? "active" : ""}`}
                  aria-label="Wishlist"
                  onClick={() => setMobileOpen(false)}
                >
                  <i className="bi bi-heart"></i>
                  {wishCount > 0 && (
                    <span className="nav-badge" key={wishCount}>
                      {wishCount}
                    </span>
                  )}
                </NavLink>
              </div>

              {/* Divider */}
              <span className="nav-divider d-none d-lg-block"></span>

              {/* Auth area */}
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => `nav-profile-link ${isActive ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <i className="bi bi-person-circle"></i>
                    Profile
                  </NavLink>
                  <UserSubmitButton submit={isLogoutLoading} onClick={onLogOut} text="Logout" className="nav-auth-btn" />
                </>
              ) : (
                <NavLink to="/login" className="nav-auth-btn filled" onClick={() => setMobileOpen(false)}>
                  <i className="bi bi-box-arrow-in-right"></i>
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppNavBar;
