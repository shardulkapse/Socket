import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: { isLoggedIn: false, userId: null },
  reducers: {
    logUserIn(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload._id;
      window.localStorage.setItem("s_id", action.payload._id);
      window.localStorage.setItem("s_email", action.payload.email);
      window.localStorage.setItem("s_name", action.payload.name);
    },
    logUserInWithoutCr(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload._id;
    },
    logUserOut(state) {
      state.isLoggedIn = false;
      window.localStorage.clear();
    },
  },
});

export default userSlice.reducer;

export const userSliceActions = userSlice.actions;
