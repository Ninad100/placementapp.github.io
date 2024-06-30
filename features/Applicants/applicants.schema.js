import mongoose from "mongoose";

export const applicantSchema = new mongoose.Schema({
    applicantId: {type: String},
    BatchId: {type:Number},
    name: {type: String},
    email: {type: String, unique:true,required:true},
    DSA: {type: Number},
    WebD: {type: Number},
    React: {type: Number},
    interviews: [{
        company:{type:String},
        status: {type:String}
    }]

})