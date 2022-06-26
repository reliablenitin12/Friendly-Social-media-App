const express=require('express');
//library to use cookie parser
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;

//Library for using Express Layouts
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//Library for using express session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//for persistent storage of cookie
const MongoStore=require('connect-mongo');

//for using sass
const sassMiddleware=require('node-sass-middleware');

//telling app to use sassMiddleware
app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'

}));
//body parser to read form data
app.use(express.urlencoded());

//telling app to use cookie parser
app.use(cookieParser());

//telling app to use static folder which includes static files such as s images,logo etc
app.use(express.static('./assets'));

//telling app to use express Layouts
app.use(expressLayouts);

//extrct styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

//mogo store is used to store the session cookie in the db
//we will use middleware which takes session cookie and encrypt it
app.use(session({
   name:'Friendly',
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
     maxAge:(1000*60*100)
   },
   store:MongoStore.create(
    {
        mongooseConnection:db,
        autoRemove:'disabled',
        mongoUrl: 'mongodb://localhost/friendly_development'
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

//using passport and session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router via middleware
app.use('/',require('./routes'));


app.listen(port,function(err)
{
  if(err)
  {
   console.log("Error in running the server",err);
  }
  //interpolations
    console.log(`server is running and up on post number : ${port}`);
});