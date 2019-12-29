const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _=require('lodash');
const bcrypt = require('bcryptjs');  


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





/**
 * the User model methods
 */

UserSchema.statics.findByToken = function(token){
  
   var UserModel = this;
   var decoded ;
   
   try{
   
    decoded = jwt.verify(token ,'secretSult');
     console.log(decoded)
  }

   catch{

      // return new Promise((resolve,reject)=>{
      //        reject();
      //  })
        return Promise.reject('invalide token');
   }
   return  UserModel.findOne({
      '_id':decoded._id,
      'tokens.access':decoded.access,
      'tokens.token':token
    })
      
}

// UserSchema.statics.FindByGroup = function (email,password){

//     var  UserModel =this;

//      return  UserModel.findOne({email}).then((user)=>{
         
//           if(!user)
//               return Promise.reject('emial not found');
          
//           return new Promise((resolve ,reject) =>{
//              bcrypt.compare(password,user.password,(error,result)=>{
                
//                   if(result)
//                      resolve(user)
//                   else
//                      reject('invalid email or password')
//                    })
//               })    
//      })
  
// }
/*
    the user instaces methods
  */
 //generating the Authentication token for each user
 UserSchema.methods.genAuthToken =  function (){

  var userInstance = this ;
  var access='Auth';
    
  var token =  jwt.sign({_id:userInstance._id.toHexString(),access},'secretSult').toString();

 // userInstance.tokens =userInstance.tokens.concat([{access,token}])
    userInstance.tokens.push({access,token})

   //???
  return  userInstance.save().then(()=>{ return token});
  
}

// //override method toJSON to customize which data will be send to the user  
// UserSchema.methods.toJSON = function(){

//  var user = this;
// //  var userObj = user.toObject();    
//  return  _.pick(user,['username','email']);

// }


//hashing the password useing the preproccessing 
UserSchema.pre('save',function(next){
   //i does not use arrow func to be able to use 'this' keyword
  var user =this 
     //do hashing process only if the password has modified
  if(user.isModified('password')){
     
   //generate salting 
     bcrypt.genSalt(5,(error,salt)=>{

           // if(error)  return promise.reject();
           bcrypt.hash(user.password,salt,(error ,hash)=>{

             // if(error) return promise.reject();
              user.password = hash;
              
              next();

           })
     })
  }else{
      //continue execute the callback queue
    next();
  }
})

 var User = mongoose.model('user',UserSchema)

 module.exports = {User ,UserSchema}
