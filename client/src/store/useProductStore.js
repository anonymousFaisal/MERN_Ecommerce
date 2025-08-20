import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  // --- Search state ---
  searchQuery: "",
  setSearchQuery: (keyword) => set({ searchQuery: keyword }),

  // --- Lists ---
  brandList: null,
  categoryList: null,
  sliderList: null,
  listByRemark: null,
  listProduct: null,

  // --- Fetchers ---
  fetchBrands: async () => {
    try {
      const res = await axios.get("/api/v1/ProductBrandList");
      if (res.data.status === "success") set({ brandList: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchCategories: async () => {
    try {
      const res = await axios.get("/api/v1/ProductCategoryList");
      if (res.data.status === "success") set({ categoryList: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchSliders: async () => {
    try {
      const res = await axios.get("/api/v1/ProductSliderList");
      if (res.data.status === "success") set({ sliderList: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchListByRemark: async (remark) => {
    try {
      set({ listByRemark: null }); // optional: show skeleton while loading
      const res = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
      if (res.data.status === "success") set({ listByRemark: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchListByBrand: async (brandID) => {
    try {
      set({ listProduct: null }); // optional: show skeleton while loading
      const res = await axios.get(`/api/v1/ProductListByBrand/${brandID}`);
      if (res.data.status === "success") set({ listProduct: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchListByCategory: async (categoryID) => {
    try {
      set({ listProduct: null });
      const res = await axios.get(`/api/v1/ProductListByCategory/${categoryID}`);
      if (res.data.status === "success") set({ listProduct: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchListBySimilar: async (productID) => {
    try {
      set({ listProduct: null });
      const res = await axios.get(`/api/v1/ProductListBySimilar/${productID}`);
      if (res.data.status === "success") set({ listProduct: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },

  fetchListBySearch: async (query) => {
    try {
      set({ listProduct: null });
      const res = await axios.get(`/api/v1/ProductListBySearch/${encodeURIComponent(query)}`);
      if (res.data.status === "success") set({ listProduct: res.data.data });
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useProductStore;
