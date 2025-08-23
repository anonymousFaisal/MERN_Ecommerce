import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";
import useProductStore from "../../store/useProductStore";
import useUserStore from "../../store/useUserStore";
import UserSubmitButton from "../user/UserSubmitButton";
import useCartStore from "../../store/useCartStore";
import useWishStore from "../../store/useWishStore";

const AppNavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, fetchUserLogout } = useUserStore();
  const { searchQuery, setSearchQuery } = useProductStore();
  const { cartCount, fetchCartList, resetCart } = useCartStore();
  const { wishCount, fetchWishList, resetWish } = useWishStore();
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
    await fetchUserLogout();
    sessionStorage.clear();
    localStorage.clear();
    resetCart();
    resetWish();
    navigate("/");
  };
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartList().catch(() => {});
      fetchWishList().catch(() => {});
    } else {
      resetCart();
      resetWish();
    }
  }, [isLoggedIn, fetchCartList, resetCart, fetchWishList, resetWish]);

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

              {/* Add more:
              <li className="nav-item"><NavLink className="nav-link" to="/shop">Shop</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
              */}
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
                <button className="btn btn-outline-dark" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>

              <NavLink
                to="/cart"
                aria-label="Cart"
                className={({ isActive }) =>
                  `btn ms-2 position-relative d-inline-flex align-items-center ${isActive ? "btn-success text-white" : "btn-light text-dark"}`
                }
              >
                <i className="bi bi-bag fs-5 me-1"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/wish"
                aria-label="Wishlist"
                className={({ isActive }) =>
                  `btn ms-2 position-relative d-inline-flex align-items-center ${isActive ? "btn-success text-white" : "btn-light text-dark"}`
                }
              >
                <i className="bi bi-heart fs-5 me-1"></i>
                {wishCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishCount}
                    <span className="visually-hidden">items in wishlist</span>
                  </span>
                )}
              </NavLink>

              {isLoggedIn ? (
                <>
                  <Link className="btn btn-success" to="/profile">
                    Profile
                  </Link>
                  <UserSubmitButton onClick={onLogOut} text="Logout" className="btn btn-outline-dark" />
                </>
              ) : (
                <>
                  <Link className="btn btn-success" to="/login">
                    Login
                  </Link>
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
