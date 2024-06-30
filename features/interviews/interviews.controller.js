import { CustomErrorHandler } from "../../Middlewares/error.handler.js";
import InterviewRepository from "./interview.repository.js";


export default class InterviewController{
    constructor(){
        this.interviewRepository = new InterviewRepository();
    }

    async addNewInterviewController(req,res,next){

        try{

            const interviewAdded = await this.interviewRepository.addInterview(req.body);

            if(interviewAdded.success){
                //res.status(200).json({success:true,interview: interviewAdded.interview})
                res.redirect('/api/interviews/');
            }else{
                next(new CustomErrorHandler(interviewAdded.message,400));
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }

    async getAllInterviewsController(req,res,next){
        try{

            const interviews = await this.interviewRepository.getAllInterviewData();

            if(interviews.success){
               // res.status(200).json({success:true,interviewList: interviews.interviewArr})
                res.render('interviewList',{token:req.cookies.token, interviews: interviews.interviewArr})
            }else{
                next(new CustomErrorHandler(interviews.message,400));
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }

    async updateInterviewController(req,res,next){
        try{
            const id = req.params.userid;
            const status = req.body.status

            const updated = await this.interviewRepository.updateInterview(id,status);
            if(updated.success){
                //res.status(200).json({success:true,message:"Update Successful!"})
                res.redirect('/api/interviews/')
            }else{
                next(new CustomErrorHandler(updated.message,400));
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }
}