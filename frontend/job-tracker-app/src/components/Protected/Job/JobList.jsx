import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, getJobs } from "../../../features/jobs/JobSlice";
import JobForm from "./JobForm";
import JobCard from "./JobCard";
import Loading from "../../Chart/Loading";
import { useTheme } from "../../../context/ThemeContext";

function JobList() {
  const { jobs, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };

  function editJob(job) {
    setEditing(job);
    setToggleForm(true);
  }
  const { theme } = useTheme();

  if (loading) return <Loading />;

  return (
    <div
      className={
        theme === "dark" ? "bg-[#474646] text-white" : "bg-white text-black"
      }
    >
      <div className="add-job">
        <button
          onClick={() => setToggleForm(true)}
          className="bg-blue-600 font-semibold text-white py-1 px-2 rounded cursor-pointer"
        >
          Add new entry <span className="text-bold">+</span>
        </button>
      </div>

      {toggleForm && (
        <div className="job-form-wrap h-screen">
          <button
            onClick={() => setToggleForm(false)}
            className="bg-blue-600 text-white py-1 px-2 rounded cursor-pointer m-3"
          >
            X
          </button>
          <JobForm
            onComplete={() => setEditing(null)}
            editJob={editing}
            onModalClose={() => setToggleForm(false)}
          />
        </div>
      )}

      <ul>
        <h2 className="font-semibold mb-4 mt-4 text-center">
          Job Applications
        </h2>
        {jobs &&
          jobs.length > 0 &&
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={(job) => editJob(job)}
              onDelete={(id) => handleDelete(id)}
              onModalOpen={() => setToggleForm(true)}
            />
          ))}
      </ul>
    </div>
  );
}

export default JobList;
