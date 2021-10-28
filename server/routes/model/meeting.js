
const mongoose = require("mongoose");

const MeetingSchema=mongoose.Schema({

  id:{
    type:String,
    require:true,

  },

   title:{
     type:String,
     require:true,

   },
   UsersId:{
    type:String,
    require:true,

  },
  initiatorId:{
    type:String,
    require:true,

  },

   status:{
     type:String,
     require:true,
   },

   porteeConf:{
       type:String,
       require:true,
   },
   HeureDebut:{
       type:String,
       require:true,

   },
   HeureFin:{
    type:Boolean,
    require:true,
   }



})

const meetingCollection=mongoose.model("MeetingCollection",MeetingSchema);

module.exports= meetingCollection;