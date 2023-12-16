import { createSlice } from "@reduxjs/toolkit";
import { apis } from "../apis";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    successMessage: "",
    error: "",
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apis.login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(apis.login.fulfilled, (state, action) => {
      localStorage.setItem("user", action?.payload);
      state.loading = false;
      state.user = action?.payload;
      state.successMessage = "Logged in successfully";
    });
    builder.addCase(apis.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    });
    builder.addCase(apis.resetAll, (state) => {
      state.loading = false;
      state.error = "";
      state.user = {};
      state.successMessage = "";
    });
  },
});

export default loginSlice.reducer;
