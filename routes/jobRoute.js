const express = require("express");
const Jobs = require("../models/jobModel.js");
const jobRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const { isValid, isEmployer, isAuth, generateToken } = require("../utils.js");
//get all jobs
jobRouter.get("/jobs", async (req, res) => {
  const job = await Jobs.find({});
  res.send(job);
});

//Get each employer jobs 
jobRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const job = await Jobs.find({user: req.user._id});
    res.send(job);
  })
);

//Get recent employer jobs 
jobRouter.get(
  '/sort/mine',
  isAuth,
  isEmployer,
  expressAsyncHandler(async (req, res) => {
    const job = await Jobs.find({ user: req.user._id }).sort({publish: +1}).limit(10);
    res.send(job);
    console.log(job)
  })
);

//Get recent  jobs 
jobRouter.get(
  '/sort/recent/jobs',
  expressAsyncHandler(async (req, res) => {
    const job = await Jobs.find({}).sort({createdAt: +1}).limit(5);
    res.send(job);
  })
);
//get job by _id{detail page}

jobRouter.get(`/id/:id`, async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  if (job) {
     res.status(201).send(job);
  } else {
    console.log("error");
    res.status(404).send({ message: "job Not Found" });
  }
});

//delete job Employer
jobRouter.delete(`/job/employer/delete/:id`, isAuth, isEmployer, async (req, res) => {
  const id = req.params.id;
  const job = await Jobs.findById(req.params.id);
  if (job) {
    await job.remove();
    res.send({ message: "job deleted" });
  } else {
    res.status(404).send({ message: "job Not Found" });
  }
});
//delete job Admin
jobRouter.delete(`/job/admin/delete/:id`, isAuth, async (req, res) => {
  const id = req.params.id;
  const job = await Jobs.findById(req.params.id);
  if (job) {
    await job.remove();
    res.send({ message: "job deleted" });
  } else {
    res.status(404).send({ message: "job Not Found" });
  }
});

// add job

jobRouter.post("/jobs/add", isAuth, (req, res) => {
  const jobDetail = {
    tittle: req.body.tittle,
    nature: req.body.nature,
    dateline: req.body.dateline,
    location: req.body.location,
    qualification: req.body.qualification,
    description: req.body.description,
    salary: req.body.salary,
    companyInfo: req.body.companyInfo,
    publish: req.body.publish,
    vacant: req.body.vacant,
    country: req.body.country,
    category: req.body.category,
    email: req.body.email,
    user: req.user._id,
  };
  Jobs.create(jobDetail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//get job by category{job page}
jobRouter.get(`/jobs/category/:name`, async (req, res) => {
  try {
    const alljobs = await Jobs.find({ category: req.params.name });
    res.status(200).send(alljobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = jobRouter;
