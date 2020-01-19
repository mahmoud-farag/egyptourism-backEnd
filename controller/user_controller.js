const _ = require('lodash');
const mongoose = require('mongoose');

const {validateEmail} = require('./../models/middlewars/emailValidation');
const {User ,UserSchema} = require('./../models/Users/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');  


var login = async (req,res) =>{     
            
    
    if(validateEmail(req.body.email) && (req.body.password.length < 4))
           res.send(' valid')


           else
           res.send(' not valid')


  
    // console.log(req.body.email)  
    // try{      
    //        if(!validateEmail(req.body.email) && !(req.body.password.length < 4)){
            
            
    //         return Promise.reject('email or password not valid')
                
    //        }else{
    //            //take the email from the req and find the user in the db
              
    //                var email = req.body.email;
    //              var user = await User.findOne({email})
                             
    //                 if(!user){
    //                      return Promise.reject('user not found');
    //                 }else{
                           
    //                            console.log(req.body.password)
    //                            console.log(user.password)
    //                     bcrypt.compare(req.body.password,user.password,(error,result)=>{
    //                            if(error)
    //                                return Promise.reject('error on decryption')

    //                             console.log('result:'+result)   
    //                         if(!result){
    //                             return Promise.reject('data was manuplated')
                      
    //                         }
    //                         else{
    //                             console.log('token')
    //                             user.genAuthToken().then((error,token)=>{
      
    //                                   if(error){
    //                                     return Promise.reject(error);
    //                                   }
    //                                   console.log(token)
    //                                 res.header('X-Auth',token).status(200).send(user);
    //                             }
    //                             )   
    //                         }
    //                     }).then(error=>{
    //                         return Promise.reject(error);
    //                     })
                           
                                                   
    //                 }      
    //        }
    //    }
    //    catch(error){
    //          res.status(400).send(error);
    //    }
       
}

var get_all = async (req,res)=>{

    try{

          
        var users = await User.find();
          
         res.status(200).send(users);
    }
    catch(error){
          res.status(400).send(error);
    }

}

var getUserById = async (req,res)=>{

   try{
       
       var user = await User.findById(req.params.id);
       
          if(!user){
               res.status(400).send('user not found');
          }else{
                
              res.status(200).send(user);

          }       
   }catch(error){
        res.status(500).send(error);
   }
}

var signUp = async (req,res)=>{

     try{
        var body = _.pick(req.body,['username','email','password']);
         
        var user = new User (body)
        var result = await user.save();
        var token = await  user.genAuthToken(); 
           
        res.header('X-Auth',token).status(200).send(result);
        
     }catch(error){
           
          res.status(400).send(error)
     }
}

var deleteUser = async (req,res)=>{
  
     try{

        var user = await User.findByIdAndDelete(req.params.id);
        
         if(!user){
             res.status(400).send('user not found');
         }else{

             res.status(200).send(user);
         }

     }catch(error){
          
          res.status(400).send(error)
     }

}

var update = async (req , res)=>{

    try{
       var user = await User.findByIdAndUpdate(req.params.id);

       if(!user){
           res.status(400).send("user not found")
      }else{
        user.username = (req.body.username)? req.body.username : user.username,
        user.email = (req.body.email)? req.body.email : user.email,
        user.password= (req.body.password)? req.body.password :user.password

        var updatedUser = await user.save();
            res.status(200).send(updatedUser);
      }
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {login , get_all , getUserById , signUp , deleteUser , update}