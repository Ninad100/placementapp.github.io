

export function homepageController(req,res,next){

    res.render('homepage',{token: req.cookies.token,success:true});
}