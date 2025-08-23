import React, { useEffect } from "react";
import useUserStore from "../../store/useUserStore";
import toast from "react-hot-toast";
import ProfileSkeleton from "./../../skeleton/ProfileSkeleton";

const ProfileForm = () => {
  const { profileFormOnChange, profileForm, profileDetails, fetchProfileDetails, fetchProfileUpdate } = useUserStore();
  useEffect(() => {
    (async () => await fetchProfileDetails())();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Save = async () => {
    let res = await fetchProfileUpdate(profileForm);
    if (res) {
      toast.success("Profile Updated Successfully");
      await fetchProfileDetails();
    }
  };
  if (profileDetails === null) {
    return <ProfileSkeleton />;
  } else {
    return (
      <div className="container mt-5">
        <div className="card shadow-sm p-4 rounded-3">
          {/* Customer Section */}
          <h5 className="fw-bold mb-3">Customer Details</h5>
          <hr />
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Name</label>
              <input
                value={profileForm.cus_name}
                onChange={(e) => profileFormOnChange("cus_name", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Phone</label>
              <input
                value={profileForm.cus_phone}
                onChange={(e) => profileFormOnChange("cus_phone", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Fax</label>
              <input
                value={profileForm.cus_fax}
                onChange={(e) => profileFormOnChange("cus_fax", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Country</label>
              <input
                value={profileForm.cus_country}
                onChange={(e) => profileFormOnChange("cus_country", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer City</label>
              <input
                value={profileForm.cus_city}
                onChange={(e) => profileFormOnChange("cus_city", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer State</label>
              <input
                value={profileForm.cus_state}
                onChange={(e) => profileFormOnChange("cus_state", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Post Code</label>
              <input
                value={profileForm.cus_postcode}
                onChange={(e) => profileFormOnChange("cus_postcode", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Customer Address</label>
              <input
                value={profileForm.cus_add}
                onChange={(e) => profileFormOnChange("cus_add", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          {/* Shipping Section */}
          <h5 className="fw-bold mb-3">Shipping Details</h5>
          <hr />
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping Name</label>
              <input
                value={profileForm.ship_name}
                onChange={(e) => profileFormOnChange("ship_name", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping Phone</label>
              <input
                value={profileForm.ship_phone}
                onChange={(e) => profileFormOnChange("ship_phone", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping Country</label>
              <input
                value={profileForm.ship_country}
                onChange={(e) => profileFormOnChange("ship_country", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping City</label>
              <input
                value={profileForm.ship_city}
                onChange={(e) => profileFormOnChange("ship_city", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping State</label>
              <input
                value={profileForm.ship_state}
                onChange={(e) => profileFormOnChange("ship_state", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping Post Code</label>
              <input
                value={profileForm.ship_postcode}
                onChange={(e) => profileFormOnChange("ship_postcode", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Shipping Address</label>
              <input
                value={profileForm.ship_add}
                onChange={(e) => profileFormOnChange("ship_add", e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="row mt-3">
            <div className="col-md-3">
              <button className="btn btn-success w-100" onClick={Save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
