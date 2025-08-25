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
  cartTotal: 0,
  cartVatTotal: 0,
  cartPayableTotal: 0,
  resetCart: () => set({ cartList: null, cartCount: 0 }),
  fetchCartList: async () => {
    try {
      const res = await axios.get(`/api/v1/CartList`);
      const list = res?.data?.data || [];
      set({ cartList: list, cartCount: list.length });
      let total = 0;
      let vat = 0;
      let payable = 0;
      res.data.data.forEach((item) => {
        if (item.product.discount) {
          total += parseInt(item.product.discountPrice) * parseInt(item.qty);
        } else {
          total += parseInt(item.product.price) * parseInt(item.qty);
        }
        vat = total * 0.05;
        payable = total + vat;
      });
      set({
        cartTotal: total,
        cartVatTotal: vat,
        cartPayableTotal: payable,
      });
    } catch (e) {
      const status = e?.response?.status;
      if (status === 401) {
        set({ cartList: null, cartCount: 0 });
        return;
      }
      unauthorized(status);
    }
  },
  fetchRemoveCart: async (cartID, productID) => {
    try {
      set({ cartList: null });
      const res = await axios.post(`/api/v1/RemoveCartList`, { cartID, productID });
      return res?.data?.status === "success";
    } catch (e) {
      unauthorized(e?.response?.status);
      return false;
    }
  },
}));

export default useCartStore;
