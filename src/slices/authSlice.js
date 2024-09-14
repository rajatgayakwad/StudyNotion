import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },

    setSignupData(state, value) {
      state.signupData = value.payload;
      state.loading = false;
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setToken, setSignupData, setLoading } = authSlice.actions;

export default authSlice.reducer;
