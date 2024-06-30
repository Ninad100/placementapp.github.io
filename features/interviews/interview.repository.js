import mongoose from "mongoose";
import { interviewSchema } from "./interviews.schema.js";
import { applicantSchema } from "../Applicants/applicants.schema.js";


const interviewModel = mongoose.model('Interview',interviewSchema);
const applicantModel = mongoose.model('Applicant',applicantSchema);
export default class InterviewRepository{

    async addInterview(data){
        const {companyName,applicantName,batchId,status,applicantId} = data;

        const interview = new interviewModel({
            companyName: companyName,
            applicantName: applicantName,
            applicantId: applicantId,
            batchId: batchId,
            status: status
        });

        try{
            await interview.save();
            const interviewData = {
                company: companyName,
                status: status
            }
            const applicantUpdated = await applicantModel.findOneAndUpdate({applicantId:applicantId},{
                $push: {interviews: interviewData}
            });
            
            if(interview){
                return {success: true, interview: interview}
            }else{
                return {success:false, message: "Error in scheduling interview."}
            }
        }catch(err){
            console.log(err);
            return {success:false,message: err}
        }
    }

    async getAllInterviewData(){
        try{
            const interviews = await interviewModel.find();

            if(interviews){
                return {success:true,interviewArr: interviews}
            }else{
                return {success:false,message:"Error! Please try again later"}
            }

        }catch(err){
            console.log(err);
            return {success:false,message:err}
        }
    }

    async updateInterview(id,status){
        try{
            const updatedStatus = await interviewModel.findByIdAndUpdate({_id:id},{status:status});
            if(updatedStatus){
                return {success:true}
            }else{
                return {success:false, message: "Please try again later."}
            }

        }catch(err){
            console.log(err);
            return {success:false,message: err}
        }
    }
}