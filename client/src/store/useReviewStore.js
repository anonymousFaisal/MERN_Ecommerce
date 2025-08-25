import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../utility/utility";

const useReviewStore = create((set) => ({
  isReviewSubmit: false,
  reviewFormData: { des: "", rating: "5", productID: "" },
  reviewFormOnChange: (name, value)=>{
    set((state) => ({
      reviewFormData: {
        ...state.reviewFormData,
        [name]: value,
      },
    }));
  },
  fetchSaveReview: async (PostBody) => {
    try {
      set({ isReviewSubmit: true });
      let res = await axios.post(`/api/v1/CreateReview`, PostBody);
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    } finally {
      set({ isReviewSubmit: false });
    }
  },
}));

export default useReviewStore;
