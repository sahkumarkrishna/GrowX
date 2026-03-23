import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false, // ✅ always runtime only
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false; // ✅ important (auto reset)
    },
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;