import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { employeeSchema } from "./employee.schema.js";


const employeeModel = mongoose.model('Employee',employeeSchema);

export default class EmployeeRepository{

    async signUp(username,email,password){

        try{
        const newEmployee = new employeeModel({
            username: username,
            email: email,
            password: password
        });

        await newEmployee.save();

        if(newEmployee){
            return {success:true}
        }else{
            return {success:true, message:"Signup failed,Please try again later",user: newEmployee}
        }
     }catch(err){
        console.log(err);
        return {success: false, message:err}
     }
    }


    //Function to employee signin

    async signIn(email,password){

        try{
        const employee = await employeeModel.findOne({email: email});
        if(!employee){
            return {success:false,message:"Incorrect Email Id"}
        }else{
            const result = await bcrypt.compare(password,employee.password);
            if(result){
                return {success:true,message:"Login Successful",user: employee}
            }else{
                return {success:false,message:"Incorrect Password"}
            }
        }
    }catch(err){
        return {success:false,message:err}
    }
}
}