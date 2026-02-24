import React, { useState } from "react";
import UserSubmitButton from "./UserSubmitButton";
import ValidationHelper from "./../../utility/ValidationHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useVerifyOtpMutation } from "../../redux/features/userApi";
import { setAuthStatus } from "../../redux/features/userSlice";
import { getEmail } from "../../utility/utility";

const OtpForm = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const onFormSubmit = async () => {
    if (ValidationHelper.IsEmpty(otp)) {
      toast.error("Please enter valid OTP");
      return;
    } else {
      try {
        const email = getEmail();
        const res = await verifyOtp({ email, otp }).unwrap();
        if (res?.status === "success") {
          toast.success("OTP verified successfully");
          dispatch(setAuthStatus(true));
          navigate("/");
        } else {
          toast.error("Failed to verify OTP. Please try again.");
        }
      } catch (err) {
        console.error(err);
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
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP..." type="text" className="form-control" />
            <UserSubmitButton submit={isLoading} onClick={onFormSubmit} className="btn mt-3 btn-success" text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
