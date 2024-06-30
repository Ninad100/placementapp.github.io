
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import {jwtAuth} from './Middlewares/jwt.auth.js'
import { applicationErrorHandler } from "./Middlewares/error.handler.js";
import { employeeRouter } from "./features/employee/employee.routes.js";
import { jobRouter } from "./features/jobs/jobs.routes.js";
import { interviewRouter } from "./features/interviews/interviews.routes.js";
import { applicantRouter } from "./features/Applicants/applicants.routes.js";
import { homepageController } from "./Non-Api Controller/homepage.controller.js";
import { signInPage, signUpPage } from "./Non-Api Controller/signinForm.controller.js";


export const app = express();

//Load all environment variables
dotenv.config();
app.use(expressEjsLayouts);
app.set('view engine','ejs');
app.set('views','views');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
//app.use('/')
app.use('/api/employee/',employeeRouter);
app.use('/api/jobs/',jwtAuth,jobRouter);
app.use('/api/interviews/',jwtAuth,interviewRouter);
app.use('/api/applicant/',jwtAuth,applicantRouter);



app.get('/',homepageController);
app.get('/signin-form',signInPage);
app.get('/signup-form',signUpPage)


app.use(applicationErrorHandler);

