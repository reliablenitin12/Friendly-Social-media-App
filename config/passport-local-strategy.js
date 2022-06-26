const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//telling passport to use this strategy
passport.use( new LocalStrategy({
   usernameField:'email'
},
function(email,password,done){
    //find the user and stablishing the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error in finding user----->Passport",err);
            return done(err);
        }
        if (!user || user.password!=password) { 
            console.log("Invalid Username/Password");
            return done(null, false);
         }
        return done(null, user);
    })
}
));


//Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
  done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
 User.findById(id,function(err,user){
    if(err)
    {
        console.log("Error in finding user in Passport-deserilizer");
        done(err);
    }
    return done(null,user);
 });
});


//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in,then pass request to the next function(controller's action)
    if(req.isAuthenticated()){ 
        return next();
    }
    //if user is not signed in
    return res.redirect('/users/sign-in');
 }


 passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the informations of current signed in user from the session cookie and we are just sending  this to locals  for the view
        res.locals.user=req.user;
    }
    next();
 }
module.exports=passport;