import React, { useState } from "react";
import UserSubmitButton from "./UserSubmitButton";
import ValidationHelper from "./../../utility/ValidationHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserOtpMutation } from "../../redux/features/userApi";
import { setEmail } from "../../utility/utility";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmailState] = useState("");
  const [userOtp, { isLoading }] = useUserOtpMutation();

  const onFormSubmit = async () => {
    if (!ValidationHelper.IsEmail(email)) {
      toast.error("Please enter valid email address");
      return;
    } else {
      try {
        const res = await userOtp(email).unwrap();
        if (res?.status === "success") {
          toast.success("OTP sent successfully");
          setEmail(email);
          navigate("/otp");
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      } catch (err) {
        console.error(err);
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
            <input value={email} onChange={(e) => setEmailState(e.target.value)} placeholder="Email Address" type="email" className="form-control" />
            <UserSubmitButton submit={isLoading} onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
