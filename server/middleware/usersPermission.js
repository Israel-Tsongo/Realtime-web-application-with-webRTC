
 //const PostUsers = require("../routes/model/postUsers")


 // Verifier the existance on an user
function userExist (req,res, next)  {

const matricule=req.params.matricule
if(matricule){

    const userMatricule=req.body.userMatricule    
    if(userMatricule){
        //const getUser = await PostUsers.findOne({matricule:userMatricule}) // and   password:req.body.passwordLog  
        // if(getUser==null){
        //     res.status(403)
        //     res.send("You need to sign in")

        // }else{
        //     req.user=getUser
        //     next()
        }
    }
    
next()
res.send("You need to sign in")
    
}

function authRole(){


    return (req,res,next)=>{

        if(req.user.role !=="ADMIN"){
            res.status(401)
            res.send("Not allowed")
        }
        next()
    }
}


module.exports= {
    userExist,
    authRole
}