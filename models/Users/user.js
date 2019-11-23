const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _=require('lodash');
  var UserSchema = new mongoose.Schema({
    
    username: {
      
      type:String ,
      required: true,
      trim:true,
      minlength:1

    },
    email: {
      
      type:String ,
      required: true , 
      unique:true ,
      trim: true ,
      validate:{

        
        validator: validator.isEmail,
        message:`{value} is not a valid email`
      }
               

    },
    password : {
      
      type:String, 
      required:true,
      minlength:4,
      trim:true

    },
    tokens:[{
      
      access:{
        type:String,
        required:true
      },
      token:{
        type:String,
        required:true
      }


    }]
  });




//override method toJSON to customize which data will be send to the user  
UserSchema.methods.toJSON = function(){

     var user = this;
    //  var userObj = user.toObject();    
     return  _.pick(user,['username','email']);

}


//generating the Authentication token for each user
UserSchema.methods.genAuthToken =function (){

   var user = this ;
   var access='Auth';
     
   var token = jwt.sign({_id:user._id.toHexString(),access},'secretSult').toString();
   

 //  user.tokens =user.tokens.concat([{access,token}])
     user.tokens.push({access,token})
 

   return user.save().then(()=>{ return token});
   

}


 var User = mongoose.model('user',UserSchema)
 
 module.exports = (User)