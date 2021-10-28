
const mongoose = require("mongoose");

const MessageSchema=mongoose.Schema({

  id:{
    type:String,
    require:true,

  },

   contenu:{
     type:String,
     require:true,

   },
   IdUser:{
    type:Number,
    require:true,

  },
  Date:{
    type:String,
    require:true,

  },

  


})

const messageCollection=mongoose.model("MessageCollection",MessageSchema);

module.exports= messageCollection;