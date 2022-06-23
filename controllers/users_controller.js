module.exports.profile=function(req,res)
{
    return res.render('user_profile',{
        title:"Friendly | Profile"
    });
}


//render the signUp Page
module.exports.signUp=function(req,res)
{
    return res.render('user_sign_up',{
        title: "Friendly | Sign Up"
    })
}

//render the signIn page
 module.exports.signIn=function(req,res)
{
     return res.render('user_sign_in',{
        title: "Friendly | Sign In"
     })
 }

//get the sign up data
 module.exports.create=function(req,res)
 {

 }
//get the sign in data and create the session for the user
 module.exports.createSession=function(req,res){

 }