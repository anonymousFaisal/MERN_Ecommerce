import React from "react";
import useCartStore from './../../store/useCartStore';

const CartSubmitButton = (props) => {
  
  let { isCartSubmit } = useCartStore();
  if (isCartSubmit === false) {
    return (
      <button onClick={props.onClick} type="submit" className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className="spinner-border spinner-border-sm" role="status"></div>
        &nbsp; Processing...
      </button>
    );
  }
};

export default CartSubmitButton;
