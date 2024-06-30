import express from "express";
import EmployeeController from "./employee.controller.js";
import expressEjsLayouts from 'express-ejs-layouts';
import { app } from "../../index.js";


export const employeeRouter = express.Router();

const employeeObj = new EmployeeController();

employeeRouter.post('/signup',(req,res,next)=>{
    employeeObj.signUpController(req,res,next);
});

employeeRouter.post('/signin',(req,res,next)=>{
    employeeObj.signInController(req,res,next);
});

employeeRouter.get('/signout',(req,res,next)=>{
    employeeObj.signoutController(req,res,next);
})