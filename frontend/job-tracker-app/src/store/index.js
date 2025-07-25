import { configureStore } from "@reduxjs/toolkit";

import jobSlice from "../features/jobs/JobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobSlice,
  },
});
