import { CustomErrorHandler } from "../../Middlewares/error.handler.js";
import JobRepository from "./jobs.repository.js";


export default class JobsController{
    constructor(){
        this.jobRepository = new JobRepository();
    }

    async addNewJobController(req,res,next){

        try{
            const jobAdded = await this.jobRepository.addJob(req.body);

            if(jobAdded.success){
                //res.status(200).json({success:true,jobs:jobAdded.job})
                res.redirect('/api/jobs/');

            }else{
                next(new CustomErrorHandler(jobAdded.message,400))
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500));
        }
        
    }


    async getJobsController(req,res,next){

        try{
            const jobList = await this.jobRepository.getJob();
            if(jobList.success){
                //res.status(200).json({success:true,jobs:jobList.jobs})
                //console.log(jobList)
                res.render('apphome',{jobs: jobList.jobs,token: req.cookies.token});
            }else{
                res.status(400).json({success: false, message:jobList.message})
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500));
        }
        
    }
}