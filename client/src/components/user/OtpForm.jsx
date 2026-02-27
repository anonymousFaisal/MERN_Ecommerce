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
    <>
      <style>{`
        .auth-bg {
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          min-height: 80vh;
        }
        .auth-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transform: translateY(20px);
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideUpFade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .auth-icon-circle {
          width: 64px;
          height: 64px;
          background: rgba(245, 158, 11, 0.1);
          color: var(--secondaryColor, #F59E0B);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
        }
      `}</style>

      <div className="auth-bg d-flex flex-column align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card auth-card rounded-4 shadow-lg p-4 p-sm-5 border-0" style={{ opacity: 0 }}>
                <div className="text-center">
                  <div className="auth-icon-circle">
                    <i className="bi bi-shield-lock fs-2"></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Verification Code</h3>
                  <p className="text-secondary small mb-4" style={{ lineHeight: "1.6" }}>
                    We've sent a 6-digit secure OTP code to your email address.
                  </p>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label small fw-semibold text-muted mb-2 ms-1">Enter OTP</label>
                  <div className="input-group input-group-lg bg-white rounded-3 shadow-sm border overflow-hidden">
                    <span className="input-group-text bg-white border-0 text-muted px-3">
                      <i className="bi bi-key"></i>
                    </span>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="••••••"
                      type="text"
                      maxLength={6}
                      className="form-control border-0 shadow-none px-2 fw-semibold text-tracking-widest"
                      style={{ letterSpacing: "4px", fontSize: "1.2rem" }}
                    />
                  </div>
                </div>

                <UserSubmitButton
                  submit={isLoading}
                  onClick={onFormSubmit}
                  className="btn btn-lg btn-warning w-100 rounded-pill shadow-sm fw-semibold text-white mt-2"
                  style={{ backgroundColor: "var(--secondaryColor, #F59E0B)", border: "none" }}
                  text={
                    <>
                      Verify & Login <i className="bi bi-check2-circle ms-2"></i>
                    </>
                  }
                />

                <p className="text-center text-muted small mt-4 mb-0">
                  Didn't receive the code? <br />
                  <button className="btn btn-link text-success text-decoration-none p-0 mt-1 small">Resend Email</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpForm;
