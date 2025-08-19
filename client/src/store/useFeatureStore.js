import { create } from "zustand";
import axios from "axios";

const useFeatureStore = create((set) => ({
  featuresList: null,
  fetchFeatures: async () => {
    try {
      const response = await axios.get("/api/v1/FeatureList");
      if (response.data.status === "success") {
        set({ featuresList: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useFeatureStore;
