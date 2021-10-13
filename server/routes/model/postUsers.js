
const mongoose = require("mongoose");

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

}   


})

const userCollection=mongoose.model("UserCollection",UserSchema);

module.exports= userCollection;