const express = require ('express')
const bodyParser = require('body-parser')

const connect =require('./model/config')
const User    =require('./model/db/db')

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
   
    // takeing object from the user schema
    var user =new User ({
        username: req.body.username,
        
       email: req.body.email,
       age:req.body.age
    })
     
    /**
     * save that specific user to the db
     * after user is created ,send him back to the client
     * if any error happen notify the client
     */
    user.save().then((user)=>{res.status(200).send(`${user} `)}
    ,(error)=>{ res.status(400) , console.log(error)
    })
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
     
     if(user){
        user.username = (req.body.username)? req.body.username : user.username,
        user.email = (req.body.email)? req.body.email : user.email,
        user.age = (req.body.age)? req.body.age :user.age

         user.save().then((client)=>{res.status(200).send(client)},
         (error)=>{res.status(500).send(error)})
      }else{
         res.status(404).send("user not found")
      }
      } 
      
      , (error)=>{res.status(400)}) 
  })




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})