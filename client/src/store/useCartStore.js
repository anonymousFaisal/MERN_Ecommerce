import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";

const useCartStore = create((set) => ({
  isCartSubmit: false,
  cartForm: { productID: "", color: "", qty: "1", size: "" },
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
  resetCart: () => set({ cartList: null, cartCount: 0 }),
  fetchCartList: async () => {
    try {
      const res = await axios.get(`/api/v1/CartList`);
      const list = res?.data?.data || [];
      set({ cartList: list, cartCount: list.length });
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        set({ cartList: null, cartCount: 0 });
        return;
      }
      unauthorized(status);
    }
  },
}));

export default useCartStore;
