import express from "express";
import JobsController from "./jobs.controller.js";


export const jobRouter = express.Router();

const jobObj = new JobsController();


jobRouter.post('/addJob',(req,res,next)=>{
    jobObj.addNewJobController(req,res,next);
});

jobRouter.get('/',(req,res,next)=>{
    jobObj.getJobsController(req,res,next);
})
