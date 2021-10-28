
const express = require('express');
const userRouter = express.Router()
const PostUsers = require("./model/postUsers.js")
const ChatRedis = require('../redis')
const config = require('../config');




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
           console.log("req.body=",req.body)
       try{

          const getUser = await PostUsers.findOne({matricule:req.body.matriculeLog}) // and   password:req.body.passwordLog    
        
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


module.exports = userRouter