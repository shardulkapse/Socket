import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    userDetails: UserSlice,
  },
});

export default store;
