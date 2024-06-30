import express from 'express';
import fs from 'fs';
import download from 'download';
import ObjectsToCsv from 'objects-to-csv';
import { mkConfig, generateCsv, asString } from "export-to-csv";
import converter from 'json-2-csv';
import { writeFile } from "node:fs";
import { Buffer } from "node:buffer";
import ApplicantRepository from './applicants.repository.js';
import { CustomErrorHandler } from '../../Middlewares/error.handler.js';
import path from 'path';

const csvConfig = mkConfig({ useKeysAsHeaders: true });

export default class ApplicantController{
    constructor(){
        this.applicantRepository = new ApplicantRepository();
    }

    async addApplicantController(req,res,next){
        try{
            const applicant = await this.applicantRepository.addApplicant(req.body);
            if(applicant.success){
                //res.status(200).json({success:true,applicants: applicant.applicants});
                res.redirect('/api/applicant/')
            }else{
                res.redirect('/',{success:false});
                next(new CustomErrorHandler(applicant.message,400));
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }


    async getAllApplicantsController(req,res,next){

        try{
            const applicants = await this.applicantRepository.getAllApplicants();
            if(applicants.success){
                //res.status(200).json({success:true,applicants: applicants.applicantArr});
                res.render('studentList',{token: req.cookies.token, applicants: applicants.applicantArr});
            }else{
                next(new CustomErrorHandler(applicants.message,400));
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }


    async getIndividualDetails(req,res,next){
        try{
            const id = req.params.applicantid;
            const details = this.applicantRepository.individualDetails(id);

            if(details.success){
                res.status(200).json({success:true,details: details.studentDetails});
                
            }else{
                next(new CustomErrorHandler(details.message,400))
            }

        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(err,500))
        }
    }


    async exportToCsvController(req,res,next){
        try{
            const data = await this.applicantRepository.exportToCsv();
            if(data.success){
                let studentData = 'S No, Name, Student ID, DSA, WebD, React, Interview, Status';
                studentData += '\n'
                //let studentData;
                data.applicantArr.forEach((student,idx)=>{
                    studentData += idx+1 + ',' 
                                        + student.name
                                        + ','
                                        + student.applicantId
                                        + ','
                                        + student.DSA
                                        + ','
                                        + student.WebD
                                        + ','
                                        + student.React
                                        + ','
                            if(student.interviews.length == 0){
                                studentData += ' ' + ',' + ' ' + '\n'
                            }else{
                                student.interviews.forEach((interview,idx)=>{
                                    if(idx>0){
                                        studentData += ' ' + ',' +' '+',' + ' ' + ',' + ' ' + ',' + ' ' + ',' + ' ' + ',' +  interview.company + ',' + interview.status + '\n';

                                    }else{
                                        studentData += interview.company + ',' + interview.status + '\n'
                                    }
                                    
                                })
                            }
                });

                const dataFile = fs.writeFileSync('public/test2.csv',studentData,function(error,fd){
                    console.log(error);
                })

                 
                console.log(studentData);

                const file = path.resolve("public","test2.csv");
                    const data1 = fs.readFileSync(file, 'utf-8');
                    console.log(`the data is ${data1}`)
                    res.download(file, 'studentData.csv', (err) => {
                        if (err) {
                        res.status(500).send('error');
                        }
                        else {
                        console.log('file downloaded successfully');
                        }
                    })



                /*console.log(path.resolve('test1.csv'));
                const fileToDownload = 'test1.csv';
                download(fileToDownload)
                        .then(() => {
                            console.log('Download Completed');
                        });
                console.log(path.resolve('test1.csv'));
                res.download('test1.csv');*/
                //res.redirect('/api/applicant/');
            }else{
                next(new CustomErrorHandler(data.message,400))
            }
        }catch(err){
            console.log(err);
            next(new CustomErrorHandler(500,err));
        }
    }
}