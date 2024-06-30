import express from 'express';
import ApplicantController from './applicants.controller.js';


export const applicantRouter = express.Router();

const applicantObj = new ApplicantController();
applicantRouter.get('/',(req,res,next)=>{
    applicantObj.getAllApplicantsController(req,res,next);
});


applicantRouter.post('/addStudent',(req,res,next)=>{
    applicantObj.addApplicantController(req,res,next);
});


applicantRouter.get('/export/',(req,res,next)=>{
    applicantObj.exportToCsvController(req,res,next);
})