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
              <UserSubmitButton submit={isUpdating} onClick={Save} text="Save" className="btn btn-success w-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
