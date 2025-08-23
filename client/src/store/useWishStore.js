import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";

const useWishStore = create((set) => ({
  isWishSubmit: false,

  fetchWishCreate: async (productID) => {
    try {
      set({ isWishSubmit: true });
      const res = await axios.post("/api/v1/SaveWishlist", { productID });
      return res?.data?.status === "success";
    } catch (e) {
      unauthorized(e?.response?.status);
      return false;
    } finally {
      set({ isWishSubmit: false });
    }
  },

  wishList: null,
  wishCount: 0,
  resetWish: () => set({ wishList: null, wishCount: 0 }),
  fetchWishList: async () => {
    try {
      const res = await axios.get(`/api/v1/Wishlist`);
      const list = res?.data?.data || [];
      set({ wishList: list, wishCount: list.length });
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        set({ wishList: null, wishCount: 0 });
        return;
      }
      unauthorized(status);
    }
  },
  fetchRemoveWish: async (productID) => {
    try {
      set({ wishList: null });
      const res = await axios.post(`/api/v1/RemoveWishlist`, { productID });
      return res?.data?.status === "success";
    } catch (e) {
      unauthorized(e?.response?.status);
      return false;
    }
  },
}));

export default useWishStore;
