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

  let cartTotal = 0;
  let cartVatTotal = 0;
  let cartPayableTotal = 0;

  if (cartList && Array.isArray(cartList)) {
    cartList.forEach((item) => {
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
  } else if (isCartLoading || !cartList) {
    return <CartSkeleton />;
  } else if (cartList.length === 0) {
    return <NoData />;
  } else {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              <ul className="list-group list-group-flush">
                {cartList.map((item) => {
                  let price = item.product.discount ? item.product.discountPrice : item.product.price;
                  return (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-start">
                      <img className="rounded-1" width="90" height="auto" alt={item.product.title} src={item.product.image} />
                      <div className="ms-2 me-auto">
                        <p className="fw-lighter m-0">{item.product.title}</p>
                        <p className="fw-lighter my-1">
                          Unit Price: {price}, Qty: {item.qty}, Size: {item.size}, Color: {item.color}
                        </p>
                        <p className="h6 fw-bold m-0 text-dark">
                          Total <i className="bi bi-currency-dollar"></i>
                          {parseInt(price) * parseInt(item.qty)}
                        </p>
                      </div>
                      <button onClick={() => remove(item._id, item.productID)} className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="my-4">
                <ul className="list-group bg-transparent list-group-flush">
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Total: <i className="bi bi-currency-dollar" />
                      {cartTotal}
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Vat(5%): <i className="bi bi-currency-dollar" />
                      {cartVatTotal}
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent h6 m-0 text-dark">
                    <span className="float-end">
                      Payable: <i className="bi bi-currency-dollar" />
                      {cartPayableTotal}
                    </span>
                  </li>
                  <li className="list-group-item bg-transparent">
                    <span className="float-end">
                      <CartSubmitButton submit={isCheckoutLoading} text="Check Out " onClick={onCheckout} className="btn px-5 mt-2 btn-success" />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartList;
