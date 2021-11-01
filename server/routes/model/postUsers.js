
const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const UserSchema=mongoose.Schema({

  id:{
    type:String,
    require:true,

  },

   nom:{
     type:String,
     require:true,

   },
   email:{
    type:String,
    require:true,

  },
  matricule:{
    type:String,
    require:true,

  },

   service:{
     type:String,
     require:true,
   },

   fonction:{
       type:String,
       require:true,
   },
   password:{
       type:String,
       require:true,

   },
   status:{
    type:Boolean,
    require:true,

},
   imagePath:{
    type:String,  

},   
  role:{
  type:String,  
  require:true,
}   


})
UserSchema.pre('save',async function(next){
  const salt =await bcrypt.genSalt()
  this.password=await bcrypt.hash(this.password,salt)
  next()

})

const userCollection=mongoose.model("UserCollection",UserSchema);

module.exports= userCollection;