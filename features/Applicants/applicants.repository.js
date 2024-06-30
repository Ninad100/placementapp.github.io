import mongoose from "mongoose";
import { applicantSchema } from "./applicants.schema.js";


const applicantModel = mongoose.model('Applicant',applicantSchema)
export default class ApplicantRepository{

    async addApplicant(data){

        const{applicantId,BatchId,name,email,DSA,WebD,React} = data;

        const newApplicant = new applicantModel({
            applicantId: applicantId,
            BatchId: BatchId,
            name: name,
            email: email,
            DSA: DSA,
            WebD: WebD,
            React: React 
        });

        try{
            await newApplicant.save();
            const applicantsArr = await applicantModel.find();
            if(newApplicant){
                return {success: true, applicants: applicantsArr }
            }else{
                return {success:false, message: "Error in Loading data."}
            }

        }catch(err){
            console.log(err);
            return {success: false, message:err}
        }
    }


    async getAllApplicants(){
        try{
            const applicants = await applicantModel.find();
            if(applicants){
                return {success:true,applicantArr:applicants}
            }else{
                return {success:false,message:"Error in Loading data"}
            }
        }catch(err){
            console.log(err);
            return {success:false, message: err}
        }
    }

    async individualDetails(id){

        try{
            const studentDetail = await applicantModel.findOne({applicantId: id});

            if(studentDetail){
                return {success:true, studentDetails:studentDetail }
            }else{
                return {success:false,message:"Not able to find student details."}
            }
        }catch(err){
            console.log(err);
            return {success:false, message: err}
        }
        
    }


    async exportToCsv(){
        try{
            const arr = await applicantModel.find();
            if(arr){
                return {success:true, applicantArr: arr}
            }else{
                return {success:false,message:"Please try later"}
            }
        }catch(err){
            console.log(err);
            return {success:false, message:err}
        }
    }
}