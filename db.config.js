import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;

export const connectToMongodb = async () =>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("App is conencted to MongoDB")
    }catch(err){
        console.log(err)
    }
}