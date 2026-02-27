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
          background: rgba(33, 191, 115, 0.1);
          color: var(--primaryColor);
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
                    <i className="bi bi-envelope-at fs-2"></i>
                  </div>
                  <h3 className="fw-bold text-dark mb-2">Welcome Back</h3>
                  <p className="text-secondary small mb-4" style={{ lineHeight: "1.6" }}>
                    Enter your email address to receive a secure login verification code.
                  </p>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label small fw-semibold text-muted mb-2 ms-1">Email Address</label>
                  <div className="input-group input-group-lg bg-white rounded-3 shadow-sm border overflow-hidden">
                    <span className="input-group-text bg-white border-0 text-muted px-3">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmailState(e.target.value)}
                      placeholder="hello@example.com"
                      type="email"
                      className="form-control border-0 shadow-none px-2"
                    />
                  </div>
                </div>

                <UserSubmitButton
                  submit={isLoading}
                  onClick={onFormSubmit}
                  className="btn btn-lg btn-success w-100 rounded-pill shadow-sm fw-semibold mt-2"
                  text={
                    <>
                      Continue <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  }
                />

                <p className="text-center text-muted small mt-4 mb-0">
                  By tracking, you agree to our <br />
                  <a href="#" className="text-success text-decoration-none">
                    Terms of Service
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-success text-decoration-none">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
