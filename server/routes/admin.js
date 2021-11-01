
const express = require('express');
const adminRouter = express.Router()
const PostUsers = require("./model/postUsers.js")
//const { authRole } = require('../middleware/usersPermission.js');



//authRole(),
 adminRouter.get('/userList/' , function (req , res) {
    PostUsers.find({}).then(function (users) {
    res.json({...users});
    });
   });

// authRole(),
   adminRouter.post('/users/update/', async (req , res)=> {
    
    await PostUsers.updateOne({matricule:req.body.matricule},{
                                            nom:req.body.nom,
                                            email:req.body.email,
                                            service:req.body.service,
                                            fonction:req.body.fonction,
                                            password:req.body.password,
                                            status:req.body.status,
                                },function (err,docs) {
                                        
                                    if(err) {
                                        console.log(err)
                                    }else{                    
                                        console.log("Success")     
                                        res.json({message:"Success",info:docs})
                                    }   
                }) 
                  
        
        })
    

  //  authRole(),
adminRouter.post('/users/delete/',function (req , res) {
        PostUsers.deleteOne({_id:req.body.id},function(err){
            if(err) return res.send(err)
            res.json({message:`deleted`})
        })
})


module.exports = adminRouter