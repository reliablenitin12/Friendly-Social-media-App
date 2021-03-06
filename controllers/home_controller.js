const Post=require('../models/post');

module.exports.home=function(req,res){

   //console.log(req.cookies);
   //populate the user of each post
   Post.find({})
   .populate('user')
   .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   .exec(function(err,posts){
      return res.render('home',{
         title:"Friendly | Home",
         posts:posts
         });
   });
}