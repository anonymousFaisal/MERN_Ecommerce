import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  isLoggedIn: !!Cookies.get("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAuthStatus } = userSlice.actions;
export default userSlice.reducer;
