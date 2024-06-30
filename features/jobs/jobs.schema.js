import mongoose from "mongoose";


export const jobSchema = new mongoose.Schema({
    companyName: {type: String, required: true},
    applicants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Applicant'
        }
    ],
    salary: {type: Number, required: true}
})