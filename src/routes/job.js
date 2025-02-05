const express = require('express');
const jobRouter = express.Router();
const Job = require("../models/jobs")
const JOBS_VISIBLE_DATA = "title jobType jobDescription salary location"

jobRouter.post("/job/add", async (req,res)=>{
    try {
        const requiredFields = ["title", "jobType", "salary", "location", "companyName", "email"];
        const allFieldsPresent = requiredFields.every(field => req.body[field]);

        if (!allFieldsPresent) {
            res.status(400).json({ error: "Missing required fields" });
        }
        const {title, jobType, salary, location, companyName, email} = req.body;
        const jobDescription = req.body.jobDescription || "";
        const companyDescription = req.body.companyDescription || "";
        const phone = req.body.phone || "";
        const job = new Job({
            title,
            jobType,
            jobDescription,
            salary,
            location,
            companyName,
            companyDescription,
            email,
            phone
        });
        const savedJob = await job.save();
        res.json({
            message: "User Added Successfully",
            data: savedJob
        })
    } catch (error) {
        res
            .status(400)
            .send("Error occured while saving the job:" + error.message);
    }
})

jobRouter.delete("/job/delete/:jobId", async (req,res)=>{
    try {
        const {jobId} = req.params;
        const jobData = await Job.findByIdAndDelete(jobId);
        if(!jobData){
            res.status(400).send("Job is not able to delete")
        }
        else{
            res.send("Job Deleted Successfully")
        }
    } catch (error) {
        res
            .status(400)
            .send("Error occured while Deleting the job:" + error.message);
    }
})

jobRouter.get("/job/:jobId", async (req,res)=>{
    try {
        const {jobId} = req.params;
        const jobData = await Job.findOne({_id : jobId});
        if(!jobData){
            res.status(400).send("Job not found")
        }
        res.json({
            message : "This is the job requested",
            data : jobData
        })
    } catch (error) {
        res
            .status(400)
            .send("Error:" + error.message);
    }
})

jobRouter.patch("/job/:jobId", async (req,res)=>{
    try {
        const {jobId} = req.params;
        const job = await Job.findById(jobId);
        if(!job){
            res.status(400).send("Job Doesn't exists")
        }
        Object.keys(req.body).forEach((key)=> job[key] = req.body[key]);
        await job.save();
        res.json({
            message : "Job Updated successfully",
            data : job
        })    
    } catch (error) {
        res
            .status(400)
            .send("Error occured while updating the job:" + error.message);
    }
})

jobRouter.get("/jobs", async (req,res)=>{
    try {
        const jobs = await Job.find().select(JOBS_VISIBLE_DATA)
        res.json(jobs);
    } catch (error) {
        res
            .status(400)
            .send("Error occured while getting jobs:" + error.message);
    }
})

module.exports = jobRouter;