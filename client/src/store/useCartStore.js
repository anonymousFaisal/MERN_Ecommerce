import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";

const useCartStore = create((set) => ({
  isCartSubmit: false,
  cartForm: { productID: "", color: "", qty: "", size: "" },
  cartFormOnChange: (name, value) => {
    set((state) => ({
      cartForm: {
        ...state.cartForm,
        [name]: value,
      },
    }));
  },
  fetchCartCreate: async (postBody, productID) => {
    try {
      set({ isCartSubmit: true });
      postBody.productID = productID;
      const res = await axios.post(`/api/v1/SaveCartList`, postBody);
      return res?.data?.status === "success";
    } catch (e) {
      unauthorized(e?.response?.status);
      return false;
    } finally {
      set({ isCartSubmit: false });
    }
  },

  cartList: null,
  cartCount: 0,
  fetchCartList: async () => {
    try {
      let res = await axios.get(`/api/v1/CartList`);
      set({ cartList: res?.data?.data, cartCount: res?.data?.data?.length });
    } catch (e) {
      unauthorized(e?.response?.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },
}));

export default useCartStore;
