import express from 'express';
import InterviewController from './interviews.controller.js';
import { jwtAuth } from '../../Middlewares/jwt.auth.js';

export const interviewRouter = express.Router();

const interviewObj = new InterviewController();

interviewRouter.get('/',jwtAuth,(req,res,next)=>{
    interviewObj.getAllInterviewsController(req,res,next);
});

interviewRouter.post('/addInterview',(req,res,next)=>{
    interviewObj.addNewInterviewController(req,res,next);
});


interviewRouter.post('/:userid',(req,res,next)=>{
    interviewObj.updateInterviewController(req,res,next);
})