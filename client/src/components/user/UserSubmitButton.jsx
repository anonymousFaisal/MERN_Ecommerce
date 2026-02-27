import React from "react";

const UserSubmitButton = (props) => {
  if (props.submit === false || !props.submit) {
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
