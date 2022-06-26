const Post = require('../models/post');
const Comment =require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){
            console.log('error in creating a post');
             return;
            }
        return res.redirect('back');
    });
}

module.exports.destroy=function(req,res){
    Post.findById(req.params.id, function(err,post){
        if(err)
        {
            return console.log("error in finding post while deleting the post",err);
        }
        //.id converts the object id into string
        if(post.user==req.user.id){
          post.remove();

          Comment.deleteMany({post: req.params.id},function(err){
            if(err)
            {
                return console.log("Error in finding comments while deleting",err);
            }
            return res.redirect('back');
          });
        }else{
            return res.redirect('back');
        }
    })
}