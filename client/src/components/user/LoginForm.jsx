import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import useUserStore from "../../store/useUserStore";
import ValidationHelper from "./../../utility/ValidationHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  let navigate = useNavigate();
  const { loginFormData, loginFormOnChange, fetchUserOtp } = useUserStore();
  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(loginFormData.email)) {
      toast.error("Please enter valid email address");
      return;
    } else {
      const res = await fetchUserOtp(loginFormData.email);
      if (res) {
        toast.success("OTP sent successfully");
        // navigate
        navigate("/otp");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    }
  };

  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Your Email</h4>
            <p>A verification code will be sent to the email address you provide</p>
            <input
              value={loginFormData.email}
              onChange={(e) => loginFormOnChange("email", e.target.value)}
              placeholder="Email Address"
              type="email"
              className="form-control"
            />
            <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
