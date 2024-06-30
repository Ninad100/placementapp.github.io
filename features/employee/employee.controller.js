
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomErrorHandler } from "../../Middlewares/error.handler.js";
import EmployeeRepository from "./employee.repository.js";



export default class EmployeeController{
    constructor(){
        this.employeeRepository = new EmployeeRepository();
    }


    async signUpController(req,res,next){
        const {username,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,12);

        try{
        const signUpSuccess = await this.employeeRepository.signUp(username,email,String(hashedPassword));
        if(signUpSuccess.success){
            //res.status(200).json({success:true,message:"Signup successfully",userData:signUpSuccess.user})
            res.redirect('/signin-form/')
        }else{
            next(new CustomErrorHandler(signUpSuccess.message,400));
        }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500));
        }
    }

    async signInController(req,res,next){

        try{
            const {email,password} = req.body;
            //console.log(email);
            //console.log(password);
            const user = await this.employeeRepository.signIn(String(email),password);

            if(user.success){
                const token = jwt.sign({empEmail: user.email,empid: user._id},process.env.TOKEN,{expiresIn: '5h'});
                res.cookie('token',token);
                //res.cookie('userid',user.email);
                //res.status(200).json({success:true,message:"Login Successful!",userData: user});
                res.redirect('/api/jobs/')
            }else{
                res.render('signinForm',{success:false});
                next(new CustomErrorHandler(user.message,400));
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500));
        }

    }

    signoutController(req,res,next){
        //res.cookie('userid',null);
        //res.cookie('token',null);
        
        res.clearCookie('token');
        res.redirect('/');
    }
}