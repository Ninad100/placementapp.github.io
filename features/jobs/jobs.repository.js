import mongoose, { mongo } from "mongoose";
import { jobSchema } from "./jobs.schema.js";

const jobModel = mongoose.model('Job',jobSchema);
export default class JobRepository{

    async addJob(jobObj){
        const {companyName,salary} = jobObj;
        const newJob = new jobModel({companyName: companyName,
            salary: salary
        });
        try{
            await newJob.save();
            if(newJob){
                return {success:true, job: newJob}
            }else{
                return {success:false,message: 'Error in adding new job'}
            }
            
        }catch(err){
            console.log(err);
            return {success: false, message: err}

        }
        
        
    }

    async getJob(){
        try{
            const jobs = await jobModel.find();
            if(jobs){
                return {success: true, jobs: jobs}
            }else{
                return {success:false,message:"Not able to find the jobs, Try again later"}
            }
        }catch(err){
            console.log(err);
            return {success:false, message:err}
        }
    }
}