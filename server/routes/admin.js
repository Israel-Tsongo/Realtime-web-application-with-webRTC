
const express = require('express');
const adminRouter = express.Router()
const PostUsers = require("./model/postUsers.js")
const { authRole } = require('../middleware/usersPermission.js');




 adminRouter.get('/userlist/:number' ,authRole(), function (req , res) {
    PostUsers.find({}).then(function (users) {
    res.send(users);
    });
   });

   adminRouter.post('/users/update/:number' ,authRole(), function (req , res) {
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


adminRouter.post('/users/delete/:number' ,authRole(),function (req , res) {
        PostUsers.deleteOne({_id:req.body.id},function(err){
            if(err) return res.send(err)
            res.json({message:`deleted`})
        })
})


module.exports = adminRouter