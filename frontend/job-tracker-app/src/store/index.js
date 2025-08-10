import { configureStore } from "@reduxjs/toolkit";

import jobSlice from "../features/jobs/JobSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    jobs: jobSlice,
    auth: authReducer,
  },
});
