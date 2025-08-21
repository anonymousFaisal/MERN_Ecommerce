import { create } from "zustand";
import axios from "axios";

const useFeatureStore = create((set) => ({
  featuresList: null,
  legalDetails: null,
  fetchFeatures: async () => {
    try {
      set({ featuresList: null });
      const response = await axios.get("/api/v1/FeatureList");
      if (response.data.status === "success") {
        set({ featuresList: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
   fetchLegalDetails: async (type) => {
    try {
      set({ legalDetails: null });
      const res = await axios.get(`/api/v1/LegalDetails/${type}`);
      if (res.data.status === "success") set({ legalDetails: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

}));

export default useFeatureStore;
