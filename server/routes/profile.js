
const path = require('path');               
const multer=require("multer")
const express = require('express');
const profileRouter = express.Router()
const PostUsers = require("./model/postUsers.js")






profileRouter.get('/user',async (req,res)=>{

    const getUser = await PostUsers.findOne({matricule:req.query.matricule}) 
    if(getUser){
        
        res.json({nom:getUser.nom,email:getUser.email,service:getUser.service,fonction:getUser.fonction})

    }else{
        res.status(404).json({mesage:"User not found"})

    }


})
profileRouter.post('/userUpdate',async (req,res)=>{

    
    
     if(!req.body.matricule){
        
          res.json({message:"No matricule entered"})

     }else{
         
     await PostUsers.updateOne({matricule:req.body.matricule},{nom:req.body.nom,email:req.body.email,service:req.body.service,fonction:req.body.fonction},function (err,docs) {
               
        if(err) {
                    console.log(err)
                }else{                    
                    
                    res.json({message:"Success",info:docs})
                }   
         }) 
        }  
 
})










//cb represent the callback function
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname+'/imageProfile/'))   
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)      
    }
})
var upload = multer({ storage: storage });


///Profile
profileRouter.post("/image",upload.single("image"),async (req,res)=>{
                console.log("save Img")

                 try{
                    //    if(req.file.detectedMimeType !="image/jpg" && req.file.detectedMimeType !="image/png" &&  req.file.detectedMimeType !="image/jpeg" ){

                    //         throw Error("Invalid file")
                    //     }
                
                   
                    await PostUsers.updateOne({matricule:req.body.matricule},{imagePath:req.file.path},function (err,docs) {
                          if(err) {
                              console.log(err)
                          }else{
                              console.log("Update Docs",docs)
                          }
                     
                    })                           
                 
                 
                 
                    }catch(err){
                        console.log(err)
                     res.status(500).send({message:err})
                     //return res.send({ code: 500, message:err })
                 }


})


profileRouter.get("/image",async (req,res)=>{

    console.log("====",req.query.matricule)
              const matricule=req.query.matricule
            if(matricule!=undefined){

                const user = await PostUsers.findOne({matricule:matricule}) 
                if(user!=null){

                    console.log("When get path ",user.imagePath)
                    user?res.sendFile(user.imagePath):res.json({message: "no image found for that matricule"})
    
                }
        
               
            }else{
                res.json({mesage:"Enter your matricule"})

            }
   
     
     
  
 })

 
profileRouter.get("/",async (req,res)=>{

    console.log("====",req.query.matricule)

    const user = await PostUsers.findOne({matricule:req.query.matricule}) 
    //console.log(user)
     console.log(user.imagePath)
    // res.json({...user,imagePath:`http://localhost:3000${user.imagePath}`})
     res.sendFile(user.imagePath)
     //res.send("okay")
  
 })


module.exports = profileRouter