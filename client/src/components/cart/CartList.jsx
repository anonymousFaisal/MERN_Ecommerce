import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import NoData from "../layout/NoData";
import { Link } from "react-router-dom";
import CartSkeleton from "../../skeleton/CartSkeleton";
import CartSubmitButton from "./CartSubmitButton";
import { useGetCartListQuery, useRemoveCartItemMutation, useCreateInvoiceMutation } from "../../redux/features/cartApi";

const CartList = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const { data: cartList, isLoading: isCartLoading } = useGetCartListQuery(undefined, { skip: !isLoggedIn });
  const [removeCartItem] = useRemoveCartItemMutation();
  const [createInvoice, { isLoading: isCheckoutLoading }] = useCreateInvoiceMutation();

  const remove = async (cartID, productID) => {
    try {
      const res = await removeCartItem({ _id: cartID, productID }).unwrap();
      if (res?.status === "success") {
        toast.success("Product removed from cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove product");
    }
  };

  const onCheckout = async () => {
    try {
      const res = await createInvoice().unwrap();
      if (res?.status === "success" && res?.data?.GatewayPageURL) {
        window.location.href = res?.data?.GatewayPageURL;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to checkout");
    }
  };

  // Extract the array from API response: { status, data: [...] }
  const items = Array.isArray(cartList) ? cartList : cartList?.data;

  let cartTotal = 0;
  let cartVatTotal = 0;
  let cartPayableTotal = 0;

  if (items && Array.isArray(items)) {
    items.forEach((item) => {
      if (!item.product) return;
      let price = item.product.discount ? item.product.discountPrice : item.product.price;
      cartTotal += parseInt(price) * parseInt(item.qty);
    });
    cartVatTotal = cartTotal * 0.05;
    cartPayableTotal = cartTotal + cartVatTotal;
  }

  if (!isLoggedIn) {
    return (
      <div className="container mt-3 text-center">
        <NoData />
        <div className="card rounded-5 shadow-sm border-0 mt-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body text-center p-4">
            <h4 className="text-danger mb-3">Please login</h4>
            <p className="text-muted mb-4">You need to login to view your Cart.</p>
            <Link to="/login" className="btn btn-success btn-xl px-4">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (isCartLoading || !items) {
    return <CartSkeleton />;
  } else if (items.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row g-4">
          {/* Cart Items Column */}
          <div className="col-lg-8">
            <h4 className="fw-bold mb-4">Your Cart</h4>
            <div className="d-flex flex-column gap-3">
              {items.map((item) => {
                if (!item.product) return null;
                let price = item.product.discount ? item.product.discountPrice : item.product.price;
                return (
                  <div key={item._id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-3 d-flex flex-column flex-sm-row align-items-center gap-4">
                      <div className="flex-shrink-0" style={{ width: "120px" }}>
                        <img
                          className="rounded-3 w-100 object-cover"
                          alt={item.product.title}
                          src={item.product.image || "https://placehold.co/600x600/f8f9fa/adb5bd?text=Image+Not+Found"}
                          style={{ aspectRatio: "1/1" }}
                        />
                      </div>
                      <div className="flex-grow-1 w-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="fw-bold m-0 text-dark">{item.product.title}</h6>
                          <button
                            onClick={() => remove(item?._id, item?.productID)}
                            className="btn btn-light text-danger btn-sm border rounded-circle"
                            style={{ width: "32px", height: "32px", padding: 0 }}
                            title="Remove from Cart"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>

                        <div className="d-flex flex-wrap gap-3 mb-3 text-muted small">
                          <span className="badge bg-light text-dark border px-2 py-1">
                            <span className="fw-normal">Size:</span> {item.size || "N/A"}
                          </span>
                          <span className="badge bg-light text-dark border px-2 py-1">
                            <span className="fw-normal">Color:</span> {item.color || "N/A"}
                          </span>
                          <span className="badge bg-light text-dark border px-2 py-1">
                            <span className="fw-normal">Qty:</span> {item.qty}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="text-secondary small">Unit Price: ${price}</span>
                          <div className="h5 fw-bold text-success mb-0">${parseInt(price) * parseInt(item.qty)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4 mt-5 mt-lg-0">
            <div className="card border-0 shadow-sm rounded-4 sticky-lg-top" style={{ top: "100px", zIndex: 1 }}>
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 border-bottom pb-3">Order Summary</h5>

                <div className="d-flex justify-content-between mb-3 text-secondary">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">${cartTotal}</span>
                </div>

                <div className="d-flex justify-content-between mb-4 text-secondary">
                  <span>VAT (5%)</span>
                  <span className="fw-semibold text-dark">${cartVatTotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom align-items-center">
                  <span className="fw-bold text-dark">
                    Total <span className="small text-muted fw-normal">(incl. VAT)</span>
                  </span>
                  <span className="h4 fw-bold text-success m-0">${cartPayableTotal.toFixed(2)}</span>
                </div>

                <CartSubmitButton
                  submit={isCheckoutLoading}
                  text={
                    <>
                      Secure Checkout <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  }
                  onClick={onCheckout}
                  className="btn btn-lg w-100 btn-success rounded-pill fw-semibold shadow-sm"
                />

                <div className="text-center mt-3 d-flex align-items-center justify-content-center gap-2 text-muted small">
                  <i className="bi bi-shield-lock"></i>
                  Secure encrypted checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartList;
