import React from "react";
import useUserStore from "../../store/useUserStore";

const UserSubmitButton = (props) => {
  
  let { isFormSubmit } = useUserStore();
  if (isFormSubmit === false) {
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

export default UserSubmitButton;
