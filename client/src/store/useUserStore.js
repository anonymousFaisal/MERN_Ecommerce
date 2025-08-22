// useUserStore.js
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { getEmail, setEmail, unauthorized } from "../utility/utility";

const useUserStore = create((set) => ({
  // login and otp onchange actions
  loginFormData: { email: "" },
  loginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormData: { ...state.loginFormData, [name]: value },
    }));
  },

  otpFormData: { otp: "" },
  otpFormOnChange: (name, value) => {
    set((state) => ({
      otpFormData: { ...state.otpFormData, [name]: value },
    }));
  },

  isFormSubmit: false,
  setFormSubmit: (submit) => {
    set({ isFormSubmit: submit });
  },

  // Login and OTP api
  fetchUserOtp: async (email) => {
    set({ isFormSubmit: true });
    try {
      const res = await axios.get(`/api/v1/UserOTP/${email}`);
      setEmail(email);
      return res?.data?.status === "success";
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },

  // Check if user is logged in
  isLoggedIn: !!Cookies.get("token"),

  fetchVerifyLogin: async (otp) => {
    set({ isFormSubmit: true });
    try {
      const email = getEmail();
      const res = await axios.get(`/api/v1/VerifyOTP/${email}/${otp}`);
      const ok = res?.data?.status === "success";
      if (ok) {
        set({ isLoggedIn: true });
      }
      return ok;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },

  // Handle Logout
  fetchUserLogout: async () => {
    set({ isFormSubmit: true });
    try {
      const res = await axios.get("/api/v1/UserLogout");
      const ok = res?.data?.status === "success";
      if (ok) {
        set({ isLoggedIn: false });
      }
      return ok;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },

  // Profile Api
  profileForm: {
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
  },
  profileFormOnChange: (name, value) => {
    set((state) => ({
      profileForm: { ...state.profileForm, [name]: value },
    }));
  },

  profileDetails: null,
  fetchProfileDetails: async () => {
    try {
      const res = await axios.get("/api/v1/ReadProfile");
      if(res.data.data.length > 0) {
        set({ profileDetails: res.data.data[0] });
        set({ profileForm: res.data.data[0] });
      }
      else{
        set({ profileDetails: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  fetchProfileUpdate: async (data) => {
    try {
      set({profileDetails: null});
      const res = await axios.post("/api/v1/UpdateProfile", data);
      return res?.data?.status === "success";
    } catch (e) {
      unauthorized(e.response.status);
    }
  }
}));

export default useUserStore;
