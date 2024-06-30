import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
export const jwtAuth = (req,res,next) =>{
    
    if(!req.cookies.token){
        res.status(401).json({success:false,message:"Unauthorizeddd"});
    }

    //1. Read token

    const token = req.cookies.token;

    //Check if token is valid

    try{
        const payload = jwt.verify(token,process.env.TOKEN);
        if(payload){
            req.userid = payload.userid
        }
    }catch(err){
        console.log(err);
        res.status(401).json({success: false, msg: "Unautorized"});
    }
    next();

}
