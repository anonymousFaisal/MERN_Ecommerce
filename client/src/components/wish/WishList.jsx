import React from "react";
import { Link } from "react-router-dom";
import ProductsSkeleton from "../../skeleton/ProductsSkeleton";
import NoData from "../layout/NoData";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetWishListQuery, useRemoveWishItemMutation } from "../../redux/features/wishApi";

const WishList = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { data: wishList, isLoading: isWishLoading } = useGetWishListQuery(undefined, { skip: !isLoggedIn });
  const [removeWishItem] = useRemoveWishItemMutation();

  const remove = async (productID) => {
    try {
      const res = await removeWishItem({ productID }).unwrap();
      if (res?.status === "success") {
        toast.success("Product removed from wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product from wishlist");
    }
  };

  // Extract the array from API response: { status, data: [...] }
  const items = Array.isArray(wishList) ? wishList : wishList?.data;

  if (!isLoggedIn) {
    return (
      <div className="container mt-3 text-center">
        <NoData />
        <div className="card rounded-5 shadow-sm border-0 mt-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body text-center p-4">
            <h4 className="text-danger mb-3">Please login</h4>
            <p className="text-muted mb-4">You need to login to view your wishlist.</p>
            <Link to="/login" className="btn btn-success btn-xl px-4">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (isWishLoading || !items || !Array.isArray(items)) {
    return <ProductsSkeleton />;
  } else if (items.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          {items.map((item, i) => {
            if (!item?.product) return null;
            const hasDiscount = item.product.discount === true;
            return (
              <div key={i} className="col-md-4 col-lg-3 col-sm-6 col-12 mt-4 px-2">
                <div
                  className="card h-100 rounded-4 border-0 shadow-sm bg-white overflow-hidden product-card"
                  style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.classList.replace("shadow-sm", "shadow");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.classList.replace("shadow", "shadow-sm");
                  }}
                >
                  <div className="position-relative">
                    <img
                      alt={item.product.title}
                      className="w-100"
                      src={item.product.image || "https://placehold.co/600x600/f8f9fa/adb5bd?text=Image+Not+Found"}
                      style={{ aspectRatio: "1/1", objectFit: "cover" }}
                    />
                    {hasDiscount && (
                      <span className="badge bg-danger position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2 shadow-sm">Sale</span>
                    )}
                  </div>

                  <div className="card-body d-flex flex-column p-4">
                    <h6 className="card-title text-dark fw-bold mb-2 text-truncate" title={item.product.title}>
                      {item.product.title}
                    </h6>

                    <div className="d-flex align-items-center gap-1 text-warning mb-2">
                      <i className="bi bi-star-fill small"></i>
                      <span className="text-dark fw-bold small">{item.product.star || "0"}</span>
                    </div>

                    <div className="mb-3 mt-auto">
                      {hasDiscount ? (
                        <div className="d-flex align-items-center gap-2">
                          <span className="h5 fw-bold text-success mb-0">${item.product.discountPrice}</span>
                          <span className="text-muted text-decoration-line-through small">${item.product.price}</span>
                        </div>
                      ) : (
                        <span className="h5 fw-bold text-dark mb-0">${item.product.price}</span>
                      )}
                    </div>

                    <div className="d-flex gap-2 w-100 mt-2">
                      <Link className="btn btn-outline-success flex-grow-1 rounded-3 py-2 fw-semibold" to={`/details/${item?.productID}`}>
                        Details
                      </Link>
                      <button
                        onClick={() => remove(item?.productID)}
                        className="btn btn-light text-danger border rounded-3 px-3 py-2"
                        title="Remove from Wishlist"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
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

export default WishList;
