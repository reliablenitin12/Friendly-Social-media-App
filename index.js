const express=require('express');
const app=express();
const port=8000;



app.listen(port,function(err)
{
  if(err)
  {
   console.log("Error in running the server",err);
  }
  //interpolations
    console.log(`server is running and up on post number : ${port}`);
});