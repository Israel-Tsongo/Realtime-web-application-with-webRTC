
const path = require('path');               
const multer=require("multer")
const express = require('express');
const profileRouter = express.Router()
const PostUsers = require("./model/postUsers.js")


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
profileRouter.post("/",upload.single("image"),async (req,res)=>{
           
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
                        
                     }).then(()=>{res.redirect("/profile")})                     
                 }catch(err){
                     return res.status(500).send({message:err})
                     //return res.send({ code: 500, message:err })
                 }


})


profileRouter.get("/image",async (req,res)=>{

    console.log("====",req.query.matricule)

    const user = await PostUsers.findOne({matricule:req.query.matricule}) 
   
     //console.log(user.imagePath)
     user?res.sendFile(user.imagePath):res.json({message: "no image found for that matricule"})
     
     
  
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