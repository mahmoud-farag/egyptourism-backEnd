const express = require ('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const connect =require('./models/config');
const {User} = require('./models/Users/user');
const {Authentication} = require('./models/middlewars/Auth');
const {validateEmail} = require('./models/middlewars/emailValidation')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 //return all users from the db
app.get('/getUsers',(req,res)=>{
    /**** 
     * fisrt find all users in db 
     * second retun them to the client 
     * if any error happen ,display it to the client
    **/
   User.find().then((users)=>{res.status(200).send(users)}
   ,(error)=>{res.status(400) , console.log(error)})
})

// return specific user from the db
app.get('/getUser/:id',(req,res)=>{

   /**** 
     * fisrt find  user by id in  db 
     * second retun him to the client 
     * if any error happen ,display it to the client
    **/
  User.findById(req.params.id).then((users)=>{res.status(200).send(users)}
  ,(error)=>{res.status(400), console.log(error) })
})

 //adding new user to the db
app.post('/creatUsers',(req,res)=>{
   
    var body = _.pick(req.body,['username','email','password']);
    // takeing object from the user schema
    var user =new User (body)
     
    /**
     * save that specific user to the db
     * after user is created ,send him back to the client
     * if any error happen notify the client
     */
    user.save()
    .then(()=>{ return user.genAuthToken()
    })
    .then((token)=>{res.header('X-Auth',token).status(200).send(user)} )
    .catch((error)=>{ res.send(error).status(500)})
  })
   //delete specific user from the db
  app.delete('/deleteUser/:id',(req,res)=>{

      //find specific user from the db and delet id also notify the client 
   User.findByIdAndDelete(req.params.id).then((user)=>{ res.status(200).send(user)}
   ,(error)=>{res.status(400) , console.log(error)})  
  
  })


   //update specific user by the id
  app.put('/updateUser/:id',(req,res)=>{

   User.findByIdAndUpdate(req.params.id)
   .then((user)=>{
        //you need to modify this code
     if(user){
        user.username = (req.body.username)? req.body.username : user.username,
        user.email = (req.body.email)? req.body.email : user.email,
        user.password= (req.body.password)? req.body.password :user.password

         user.save().then((client)=>{res.status(200).send(client)},
         (error)=>{res.status(500).send(error)})
      }else{
         res.status(404).send("user not found")
      }
      } 
      
      , (error)=>{res.status(400)}) 
  })

//find by token
app.get('/getByToken', Authentication , (req,res)=>{

      res.status(200).send(req.user)
      
       
})

//login route
app.get('/login',(req,res)=>{

   let body = _.pick(req.body,['email','password']);
      if(!validateEmail(body.email) && !(body.password.length<4)){
         res.status(400).send('invalide email or password');
      }
      else{
          User.FindByGroup(body.email,body.password).then((user)=>{

          return user.genAuthToken().then((token)=>{
            res.status(200).header('X-Auth',token).send('user logged in successfully');
           })
        
           }).catch((error)=>{
           res.status(400).send(error);
           })
         }
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})