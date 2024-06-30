import mongoose from "mongoose";

export const interviewSchema = new mongoose.Schema({
    companyName: {type: String, required: true},
    applicantName: {type: String,required: true},
    applicantId: {type:String},
    batchId: {type: Number, ref: "Applicants"},
    status: {
        type: String,
        enum: ['In Progress', 'Selected','Not Selected','On-hold']
    }
})