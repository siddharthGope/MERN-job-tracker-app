const express = require("express");
const Job = require("../model/job.model");
const verifyToken = require("../middleware/auth");

const router = express.Router();

//get jobs of logged in users

router.post("/all-jobs", verifyToken, async (req, res) => {
  const jobs = await Job.find({ user: req.user.username });
  res.json(jobs);
});

//create job

router.post("/create-job", verifyToken, async (req, res) => {
  const job = new Job({ ...req.body, user: req.user.username });
  await job.save();
  res.status(201).json(job);
});

//update job

router.put("/update/:id", verifyToken, async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, user: req.user.username },
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.status(200).json(job);
});

//delete job

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const job = await Job.findByIdAndDelete({
    _id: req.params.id,
    user: req.user.username,
  });

  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ id: req.params.id, message: "Job deleted" });
});

module.exports = router;
