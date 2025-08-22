import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import useUserStore from "../../store/useUserStore";
import ValidationHelper from "./../../utility/ValidationHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const OtpForm = () => {
  let navigate = useNavigate();
  const { otpFormData, otpFormOnChange, fetchVerifyLogin } = useUserStore();
  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(otpFormData.otp)) {
      toast.error("Please enter valid OTP");
      return;
    } else {
      const res = await fetchVerifyLogin(otpFormData.otp);
      if (res) {
        toast.success("OTP verified successfully");
        // navigate
        navigate("/");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    }
  };
  return (
    <div className="container section">
      <div className="row d-flex justify-content-center">
        <div className="col-md-5">
          <div className="card p-5">
            <h4>Enter Verification Code</h4>
            <p>A verification code has been sent to the email address you provide</p>
            <input
              value={otpFormData.email}
              onChange={(e) => otpFormOnChange("otp", e.target.value)}
              placeholder="OTP..."
              type="text"
              className="form-control"
            />
            <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
