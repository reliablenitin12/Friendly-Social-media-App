const express = require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;

//require express layout
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug: true,
   outputStyle:'expanded',
   prefix:'/css'

}));
//require body porser
app.use(express.urlencoded({extended: false}));
//require cookie parser
app.use(cookieParser());
//using static files into our project
app.use(express.static('./assets'));


//using express layout using before router because if you use after router then router automatically start using ejs files
app.use(expressLayouts);

//extract style and script from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up our view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'Sociout',
    //Todo change the secret before deployment in the production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store:MongoStore.create(
        {
            mongooseConnection:db,
            autoRemove:'disabled',
            mongoUrl: 'mongodb://localhost/sociout'
        },
        function(err)
        {
            console.log(err || 'connect-mongodb setup ok');
        }
        )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express route:-ehen the server loads its goes to routes/index.js file and search controller corresponding to that
app.use('/',require('./routes'));


app.listen(port,function(err)
{
    if(err){
        console.log("something went wrong in server",err);
        //console.log('Error:${err}'); Interpolation
    }
        console.log("server is ruuning and up on port ",port);
});