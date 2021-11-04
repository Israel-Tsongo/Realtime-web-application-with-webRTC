
const express = require('express');
const userRouter = express.Router()
const PostUsers = require("./model/postUsers.js")
const ChatRedis = require('../redis')
const config = require('../config');
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

// config.KEY: We just want to store the logged users (username has to be unique)
// so we always use the same key to adapt it to our Redis implementation

const userRole= {
    admin:"ADMIN_USER",
    user:"SITE_USER"
}

const maxAge= 3*24*60*60*1000

const createToken =(id)=>{

    return jwt.sign({id},"MySecretToken",{
        expiresIn:maxAge
    })
}

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

   console.log("+++",temp)
  const user = new PostUsers({

    id:temp.toString(),
    nom:req.body.nom,
    email:req.body.email,
    matricule:temp.toString()+"21",
    service:req.body.service,
    fonction:req.body.fonction,
    password:req.body.password,
    status:false,
    imagePath:__dirname+"/imageProfile/default.jpg",
    role:userRole.user 

  });

     try{
        const savedUser = await user.save();
        res.send(savedUser);
        console.log(`The user  ${req.body.nom} has been registered `)
     }catch(error){
        res.send({code: 401,message:error});
     }


    })

    

    // userRouter.post('/auth', async(req, res) => {

       
    //     const getUser = await PostUsers.findOne({matricule:req.body.matricule}) // and   password:req.body.passwordLog    
    //    // const auth=await bcrypt.compare(req.body.passwordLog, getUser.password)

        
    //     //console.log("The state of  user=======",auth)

    // if(!getUser){
    //     return res.send({ code: 400, message: 'You are not registered please sign up and after you will log in' }) 


    // }else{

    //     if(auth){

    //             if (!getUser.nom) return res.send({ code: 400, message: 'You are not registered please sign up and after you will log in' })
    //             console.log(`Login user ${getUser.nom}`)
            
    //             ChatRedis
    //                 .getUser(getUser.nom, config.KEY)
    //                 .then(user => {
    //                     if (!user) {
    //                         ChatRedis.addUser(getUser.nom, config.KEY, getUser)
    //                         console.log(`User ${getUser.nom} logged`)
    //                         return res.send({ code: 200, message: 'Logged in succesfully' })
    //                     }
            
    //                     console.log(`User ${getUser.username} already exists`)
    //                     return res.send({ code: 401, message: 'You can\'t login multiple times' })
    //                 })
    //             }else{
    //                 res.send({code: 401,message:"Your password is wrong"});
                    
    //             }
    //     }
    // })

    

// Login
userRouter.post('/login',async (req, res) => { 
    console.log("login")          
         
   const loginUser=req.body
   //console.log("Body",loginUser)
    try{
           //
          const getUser = await PostUsers.findOne({matricule:req.body.matriculeLog}) // and   password:req.body.passwordLog    
          
           console.log("333",getUser)
          
           const auth= await bcrypt.compare(req.body.passwordLog, getUser.password)

        //   console.log("Login auth",auth)

         if (!getUser){              
             
             
              res.status(401).send({message:"Le Numero matricule entre n est pas enregistrer dans la base de donnee"})
         }else{
             

            if(auth){
               
                 //if entered  pasword == to in database pasword
                //console.Console("-----------",getUser.status==true)
                //config.log("-----------",getUser.role==userRole.admin)

                   if(getUser.status==true||getUser.role==userRole.admin){
                    console.log("auth2=",auth)
                   //if (!getUser) { res.send({ code: 400, message: 'You are not registered please sign up and after you will log in' })}
                   
                            console.log(`Login user ${getUser}`)
                            
                                ChatRedis
                                    .getUser(getUser.nom, config.KEY)
                                    .then(user => {
                                        if(user){
                                            ChatRedis.delUser(getUser.nom, config.KEY).then((data)=>{ console.Console(" deleted",data)})
                                                         
                                        }                                        
                                        if (!user) {
                                            ChatRedis.addUser(getUser.nom, config.KEY, loginUser)
                                            console.log(`User ${getUser.nom} logged`)
                                           
                                            res.status(200).json({nomLog:getUser.nom,matricule:getUser.matricule,service:getUser.service,fonction:getUser.fonction})        
                                            //res.send({ code: 200, message: 'Logged in succesfully' })
                                        }
                            
                                        // console.log(`User ${getUser.nom} already exists`)
                                        //  res.send({ code: 401, message: 'You can\'t login multiple times' })
                                    })
                                        const token= createToken(getUser.matricule)
                                        console.log("=================token secret",token)

                                        //res.cookie('jwt',token,{httpOnly:true,maxAge})          
                                       // res.status(200).json({nomLog:getUser.nom,matricule:getUser.matricule,password:getUser.password})
                                        //res.send({nomLog:getUser.nom,matricule:getUser.matricule,password:getUser.password}) 

                                        //res.send({code:200,message:"Logged successfully"})
                                       // console.log("Logged successfully")

                        }else{
                            console.log("Votre compte n'est pas active") 
                            res.status(401).send({type:"permissionError", message:"Votre compte n'est pas encore active par l'administrateur, veillez le contacter pour son activation"})
                        }
                }else{            
                
                    res.status(401).send({message:"Vous venez d'entrer un faux mot de passe"})
                }
            
                
                }          
          
            }catch(error){
                res.send({code:401,message:"une error s'est produite lors du login"})
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
            
            res.cookie('jwt','',{maxAge:1});            
            res.send({ code: 200, message: 'Logged out succesfully' })
        })
})
userRouter.get('/flushRedis', (req,res) => {
    try{
       
        ChatRedis.RemoveAll
        console.log("Trying to flush db")
        res.json({message:"success"}) 
        
    }
    catch(error){
          res.json({message:"error"})
    }
    
})

module.exports = userRouter
