const express=require('express');
const app=express();
const port=8000;
//Library for using Express Layouts
const expressLayouts=require('express-ejs-layouts');
//telling app to use static folder which includes static files such as s images,logo etc
app.use(express.static('./assets'));
//telling app to use express Layouts
app.use(expressLayouts);
//extrct styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router via middleware
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err)
{
  if(err)
  {
   console.log("Error in running the server",err);
  }
  //interpolations
    console.log(`server is running and up on post number : ${port}`);
});