import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  brandList: null,
  fetchBrands: async () => {
    try {
      const response = await axios.get("/api/v1/ProductBrandList");
      if (response.data.status === "success") {
        set({ brandList: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
  categoryList: null,
  fetchCategories: async () => {
    try {
      const response = await axios.get("/api/v1/ProductCategoryList");
      if (response.data.status === "success") {
        set({ categoryList: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
  sliderList: null,
  fetchSliders: async () => {
    try {
      const response = await axios.get("/api/v1/ProductSliderList");
      if (response.data.status === "success") {
        set({ sliderList: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
  listByRemark: null,
  fetchListByRemark: async (remark) => {
    try {
      const response = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
      if (response.data.status === "success") {
        set({ listByRemark: response.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useProductStore;
