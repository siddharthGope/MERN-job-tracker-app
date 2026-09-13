import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  getJobs,
  selectJobsByDate,
  selectJobsByStatus,
} from "../../features/jobs/JobSlice";
const LineChart = lazy(() => import("../Chart/LineChart"));
const BarChart = lazy(() => import("../Chart/BarChart"));
const Loading = lazy(() => import("../Chart/Loading"));
const JobList = lazy(() => import("./Job/JobList"));

// import AddJob from './Job/AddJob';
import { useTheme } from "../../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const jobsByStatus = useSelector(selectJobsByStatus);
  const jobsByDate = useSelector(selectJobsByDate);

  const statusLabels = Object.keys(jobsByStatus);
  const statusData = Object.values(jobsByStatus);

  const dateLabels = Object.keys(jobsByDate).sort();
  const dateData = dateLabels.map((date) => jobsByDate[date]);

  const { theme } = useTheme();

  return (
    <>
      <div
        className={
          (theme === "dark"
            ? "bg-[#474646] text-white"
            : "bg-white text-black") + " px-2"
        }
      >
        {/* <h1 className="font-bold">Job applications statistics </h1> */}
        <div className="grid grid-cols-2 gap-4 px-2">
          {/* job list */}
          <div className="0">
            <JobList />
          </div>
          {/* Charts */}
          <div className="basis">
            <div className="grid grid-cols md:grid-cols-2 gap-8 pt-8">
            <div>
              {/* Bar Chart – Status Count */}

              {statusData.length > 0 && statusLabels.length > 0 ? (
                <BarChart statuses={statusData} sLabels={statusLabels} />
              ) : (
                <Loading />
              )}
            </div>
              

              <div>
                {/* Line Chart – Over Time */}

              {dateLabels.length > 0 && dateData.length > 0 ? (
                <LineChart dLabels={dateLabels} dates={dateData} />
              ) : (
                <Loading />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
