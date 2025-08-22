// useUserStore.js
import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { getEmail, setEmail } from "../utility/utility";

const useUserStore = create((set) => ({
  isFormSubmit: false,
  loginFormData: { email: "" },
  otpFormData: { otp: "" },

  isLoggedIn: () => {
    return !!Cookies.get("token");
  },

  loginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormData: { ...state.loginFormData, [name]: value },
    }));
  },

  otpFormOnChange: (name, value) => {
    set((state) => ({
      otpFormData: { ...state.otpFormData, [name]: value },
    }));
  },

  setFormSubmit: (submit) => {
    set({ isFormSubmit: submit });
  },

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

  fetchVerifyLogin: async (otp) => {
    set({ isFormSubmit: true });
    try {
      const email = getEmail();
      const res = await axios.get(`/api/v1/VerifyOTP/${email}/${otp}`);
      return res?.data?.status === "success";
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      set({ isFormSubmit: false });
    }
  },
}));

export default useUserStore;
