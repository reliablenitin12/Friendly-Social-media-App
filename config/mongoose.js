const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/friendly_development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

db.once('open',function(){
    console.log("Connecting to Database :: MongoDB");
});


module.exports=db;

