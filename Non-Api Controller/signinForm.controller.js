

export function signInPage(req,res,next){
    res.render('signinForm',{success:true});
}

export function signUpPage(req,res,next){
    res.render('signupForm');
}