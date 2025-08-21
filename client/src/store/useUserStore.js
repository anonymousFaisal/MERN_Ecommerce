import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../utility/utility";

const useUserStore = create(() => ({
  fetchUserOtp: async (email) => {
    try {
      const res = await axios.get(`/api/v1/UserOTP/${email}`);
      setEmail(email);
      return res.data.status === "success";
    } catch (e) {
      console.error(e);
    }
  },
  fetchVerifyLogin: async (otp) => {
    try {
      let email = getEmail();
      const res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
      return res.data.status === "success";
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useUserStore;
