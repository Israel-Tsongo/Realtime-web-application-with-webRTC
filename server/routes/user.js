
const express = require('express');
const userRouter = express.Router()

//const {promisify}=require("util")

//const pipeline = promisify(require("stream").pipeline)

const PostUsers = require("./model/postUsers.js")


const path = require('path');               // Used for manipulation with path
//const fs = require('fs-extra'); 
//const stream=require("stream")            // Classic fs

const multer=require("multer")
//const upload=multer();
//const fs=require("fs")

const ChatRedis = require('../redis')
const config = require('../config');
//const { path } = require('../app.js');


// config.KEY: We just want to store the logged users (username has to be unique)
// so we always use the same key to adapt it to our Redis implementation

async function  getMatricule(){

    let numberOfDocuments
     await PostUsers.countDocuments({},function(err,count){
        if (err){return console.log("err when counting document")}
         numberOfDocuments=count        
         console.log("count avec vide",count)   
        
    })     
    
      
        if(numberOfDocuments===0){
                return 1
        }else if(numberOfDocuments >= 1){

                const post = await PostUsers.findOne().sort({field:'asc',_id:-1}).limit(1)                       
                numberOfDocuments=(parseInt(post.id.toString())+1)                              
                return  numberOfDocuments
        
        }
     


}

userRouter.post('/register',async (req, res) => {
   let temp= await getMatricule()
  const user = new PostUsers({

    id:(await temp).toString(),
    nom:req.body.nom,
    email:req.body.email,
    matricule:( await temp).toString()+"21",
    service:req.body.service,
    fonction:req.body.fonction,
    password:req.body.password,
    status:false,
    imagePath:__dirname+"/imageProfile/default.jpg",
    role:""  

  });

     try{
        const savedUser = await user.save();
        res.send(savedUser);
        console.log(`The user  ${req.body.nom} has been registered `)
     }catch(error){
        res.send({code: 401,message:error});
     }


    })



    userRouter.post('/auth', async(req, res) => {

        const newUser = req.body 
        const getUser = await PostUsers.findOne({nom:req.body.username}) // and   password:req.body.passwordLog    
    

        //console.log("The state of  user",req.body.username)
        //console.log("The state of  user",getUser)

    if(!getUser){
        return res.send({ code: 400, message: 'You are not registered please sign up and after you will log in' }) 


    }else{
        if (!newUser.username) return res.send({ code: 400, message: 'You are not registered please sign up and after you will log in' })
        console.log(`Login user ${newUser.username}`)
    
        ChatRedis
            .getUser(newUser.username, config.KEY)
            .then(user => {
                if (!user) {
                    ChatRedis.addUser(newUser.username, config.KEY, newUser)
                    console.log(`User ${newUser.username} logged`)
                    return res.send({ code: 200, message: 'Logged in succesfully' })
                }
    
                console.log(`User ${newUser.username} already exists`)
                return res.send({ code: 401, message: 'You can\'t login multiple times' })
            })

        }
    })




// Login
userRouter.post('/login',async (req, res) => { 
          
           
       try{

          const getUser = await PostUsers.findOne({nom:req.body.nomLog}) // and   password:req.body.passwordLog    
        
          if (!getUser){
              res.send({code:401,message:"You are not registered"})
          }else{
             
            //nom= getUser.nom
            //console.log("Name",nom)             
            //res.redirect("/auth?user="+JSON.stringify(getUser)) 
            res.send({nomLog:getUser.nom,matricule:getUser.matricule,password:getUser.password})          
            //res.send({code:200,message:"Logged successfully"})
            console.log("Logged successfully")
          }          
          
       }catch(error){
        res.send({code:401,message:"une error s'est produit lors du login"})
       }
  
})

// Logout
userRouter.post('/logout', (req, res) => {
    const user = req.body
    console.log(`Logout user ${user.username}`)

    ChatRedis
        .delUser(user.username, config.KEY)
        .then(data => {
            if (!data) return res.send({ code: 400, message:'User not found' })

            return res.send({ code: 200, message: 'Logged out succesfully' })
        })
})

//#########################################################################################


//cb represent the callback function
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname+'/imageProfile/'))   
    },
    filename: function (req, file, cb) {

        cb(null, req.userMatric+file.originalname)      
    }
})
var upload = multer({ storage: storage });

///Profile
userRouter.post("/profile",upload.single("image"),async (req,res)=>{
           
                 
                 try{
                       if(req.file.detectedMimeType !="image/jpg" && req.file.detectedMimeType !="image/png" &&  req.file.detectedMimeType !="image/jpeg" ){

                            throw Error("Invalid file")
                        }

                 }catch(err){
                     const errors={error:err};
                     return res.status(201).json({errors})
                     //return res.send({ code: 201, message:err })
                 }              

                 try{
                    await PostUsers.findByIdAndUpdate(req.body.userMatric,{$set:{picture:req.file.path+req.file.originalname}},
                     {new:true,upsert:true,setDefaultsOnInsert:true},
                     (err,docs)=>{

                        if(!err)  return res.send(docs)                       
                        else  return res.send({ code: 500, message:err })                      
                        
                     })                     
                 }catch(err){
                     return res.status(500).send({message:err})
                     //return res.send({ code: 500, message:err })
                 }


})



userRouter.get("/profile/image",async (req,res)=>{

    console.log("====",req.query.userMatric)

    const user = await PostUsers.findOne({matricule:req.query.userMatric}) 
    //console.log(user)
     console.log(user.imagePath)
     res.sendFile(user.imagePath)
     //res.send("okay")
  
 })

 userRouter.get('/userlist' , function (req , res) {
    PostUsers.find({}).then(function (users) {
    res.send(users);
    });
   });

   userRouter.post('/users/update' , function (req , res) {
    PostUsers.findByIdAndUpdate(req.body.id,
                        {$set:{ 
                                nom:req.body.nom,
                                email:req.body.email,
                                service:req.body.service,
                                fonction:req.body.fonction,
                                password:req.body.password,
                                statut:req.body.statut,}                    
                           },{new:true},function(err,result){

                            if(err){
                                console.log(err)
                            }
                            console.log(result)
                            res.send("Done")
                           }
                     


    
    ) });


userRouter.post('/users/delete' , function (req , res) {

    
        
    PostUsers.deleteOne({_id:req.body.id},function(err){
        if(err) return res.send(err)
        res.json({message:`deleted`})
    })
})

module.exports = userRouter