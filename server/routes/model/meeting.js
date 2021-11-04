
const mongoose = require("mongoose");

const MeetingSchema=mongoose.Schema({

 

    initiatorMatricule:{
    type:String,
    require:true,

  },
    invitedUserMatricule:{
       type:Array,
       required:true

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
       type:Date,
       require:true,

   },
   HeureFin:{
    type:Date,
    require:true,
   }



})

const meetingCollection=mongoose.model("MeetingCollection",MeetingSchema);

module.exports= meetingCollection;