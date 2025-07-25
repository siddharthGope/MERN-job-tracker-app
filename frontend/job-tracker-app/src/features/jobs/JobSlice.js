import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:6200/jobs";

// get token from localStorage

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//Thunk

export const getJobs = createAsyncThunk("/all-jobs", async () => {
  const result = await axios.post(`${BASE_URL}/all-jobs`, {}, getAuthHeader());
  return result.data;
});

export const createJob = createAsyncThunk("/create-job", async (jobData) => {
  const response = await axios.post(
    `${BASE_URL}/create-job`,
    jobData,
    getAuthHeader()
  );
  return response.data;
});

export const updateJob = createAsyncThunk(
  "/update",
  async ({ id, ...jobData }) => {
    const response = await axios.put(
      `${BASE_URL}/update/${id}`,
      jobData,
      getAuthHeader()
    );
    return response.data;
  }
);

export const deleteJob = createAsyncThunk("/delete", async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/delete/${id}`,
    getAuthHeader()
  );
  return response.data;
});

//slice

const jobSlice = createSlice({
  name: "jobs",

  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // getjobs
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        (state.loading = false), (state.jobs = action.payload);
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //create job

      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })

      //update job
      .addCase(updateJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        );
      })
      //delete job

      .addCase(deleteJob.fulfilled, (state, action) => {
        console.log(action.payload.id);
        state.jobs = state.jobs.filter((job) => job._id !== action.payload.id);
      });
  },
});

export default jobSlice.reducer;

export const selectJobs = (state) => state.jobs.jobs;

//count by status
export const selectJobsByStatus = createSelector([selectJobs], (jobs) => {
  const counts = {};
  for (const job of jobs) {
    counts[job.status] = (counts[job.status] || 0) + 1;
  }
  return counts;
});

// Count by date
export const selectJobsByDate = createSelector([selectJobs], (jobs) => {
  const dateMap = {};
  for (const job of jobs) {
    const date = job.date.split("T")[0]; //YYYY-MM-DD
    dateMap[date] = (dateMap[date] || 0) + 1;
  }
  return dateMap;
});
