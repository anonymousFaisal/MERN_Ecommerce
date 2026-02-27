import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import ProfileSkeleton from "./../../skeleton/ProfileSkeleton";
import { useGetProfileDetailsQuery, useUpdateProfileMutation } from "../../redux/features/userApi";
import UserSubmitButton from "./UserSubmitButton";

const ProfileForm = () => {
  const { data: profileDetails, isLoading: isFetching, refetch } = useGetProfileDetailsQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [profileForm, setProfileForm] = useState({
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country: "",
    ship_name: "",
    ship_phone: "",
    ship_postcode: "",
    ship_state: "",
  });

  useEffect(() => {
    if (profileDetails) {
      setProfileForm({ ...profileForm, ...profileDetails });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileDetails]);

  const profileFormOnChange = (name, value) => {
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const Save = async () => {
    try {
      const res = await updateProfile(profileForm).unwrap();
      if (res?.status === "success") {
        toast.success("Profile Updated Successfully");
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (isFetching || profileDetails === undefined) {
    return <ProfileSkeleton />;
  } else {
    return (
      <>
        <style>{`
          .profile-bg {
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            min-height: 80vh;
            padding-bottom: 3rem;
          }
          .custom-input {
            background-color: #f8f9fa;
            border: 1px solid transparent;
            transition: all 0.2s ease-in-out;
          }
          .custom-input:focus {
            background-color: #fff;
            border-color: rgba(33, 191, 115, 0.4);
            box-shadow: 0 0 0 4px rgba(33, 191, 115, 0.1);
          }
        `}</style>
        <div className="profile-bg pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="card shadow-lg p-4 p-md-5 border-0 rounded-4">
                  <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                    <div
                      className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <i className="bi bi-person-lines-fill fs-4"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1 text-dark">My Profile</h4>
                      <p className="text-secondary small mb-0">Update your shipping and billing details</p>
                    </div>
                  </div>

                  {/* Customer Section */}
                  <h5 className="fw-bold mb-4 mt-2 text-dark">
                    <i className="bi bi-person-badge text-success me-2"></i>Personal Details
                  </h5>
                  <div className="row g-4 mb-5">
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Full Name</label>
                      <input
                        value={profileForm.cus_name}
                        onChange={(e) => profileFormOnChange("cus_name", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Phone Number</label>
                      <input
                        value={profileForm.cus_phone}
                        onChange={(e) => profileFormOnChange("cus_phone", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Fax</label>
                      <input
                        value={profileForm.cus_fax}
                        onChange={(e) => profileFormOnChange("cus_fax", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Country</label>
                      <input
                        value={profileForm.cus_country}
                        onChange={(e) => profileFormOnChange("cus_country", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="United States"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">City</label>
                      <input
                        value={profileForm.cus_city}
                        onChange={(e) => profileFormOnChange("cus_city", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="New York"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">State</label>
                      <input
                        value={profileForm.cus_state}
                        onChange={(e) => profileFormOnChange("cus_state", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Post Code</label>
                      <input
                        value={profileForm.cus_postcode}
                        onChange={(e) => profileFormOnChange("cus_postcode", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="10001"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <label className="form-label small fw-semibold text-muted ms-1">Full Address</label>
                      <input
                        value={profileForm.cus_add}
                        onChange={(e) => profileFormOnChange("cus_add", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                  </div>

                  {/* Shipping Section */}
                  <h5 className="fw-bold mb-4 mt-2 text-dark">
                    <i className="bi bi-box-seam text-success me-2"></i>Shipping Details
                  </h5>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping Name</label>
                      <input
                        value={profileForm.ship_name}
                        onChange={(e) => profileFormOnChange("ship_name", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping Phone</label>
                      <input
                        value={profileForm.ship_phone}
                        onChange={(e) => profileFormOnChange("ship_phone", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping Country</label>
                      <input
                        value={profileForm.ship_country}
                        onChange={(e) => profileFormOnChange("ship_country", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="United States"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping City</label>
                      <input
                        value={profileForm.ship_city}
                        onChange={(e) => profileFormOnChange("ship_city", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="New York"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping State</label>
                      <input
                        value={profileForm.ship_state}
                        onChange={(e) => profileFormOnChange("ship_state", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="NY"
                      />
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping Post Code</label>
                      <input
                        value={profileForm.ship_postcode}
                        onChange={(e) => profileFormOnChange("ship_postcode", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="10001"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <label className="form-label small fw-semibold text-muted ms-1">Shipping Address</label>
                      <input
                        value={profileForm.ship_add}
                        onChange={(e) => profileFormOnChange("ship_add", e.target.value)}
                        type="text"
                        className="form-control custom-input px-3 py-2 rounded-3 shadow-none"
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="row mt-5 pt-3 border-top">
                    <div className="col-12 d-flex justify-content-end">
                      <UserSubmitButton
                        submit={isUpdating}
                        onClick={Save}
                        text={
                          <>
                            Save Changes <i className="bi bi-check-circle ms-2"></i>
                          </>
                        }
                        className="btn btn-lg btn-success rounded-pill px-5 shadow-sm fw-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProfileForm;
