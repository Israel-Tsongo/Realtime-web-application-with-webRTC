<template>
    <div class="bg-primary" style="  height: 4.2rem; width:100%">
        <div style="display:flex;justify-content:center;align-items:center;height:100% ; width:100%">
                <div style="height:inherit;width:30%">


                </div>

                <div style="display:flex;justify-content:center;align-items:center;height:inherit;width:30%">

                    <div v-if="conference.admin"  :disabled="peersLength === 3 || users.length === 3"   style="height:65%;width:52%;">
                        <button @click="toggleModalToInvitePeople()" class="btn btn-light" type="button" style="margin-right: 0.4rem; width: 135px; height:40px; color:#4e73df;font-weight:800;display:flex;">
                                <span >                                    
                                    <i style="margin-right: 8px;margin-bottom: 10px;color:#4e73df;" class="fa fa-user-plus" aria-hidden="true"></i>
                                </span>Invitatiion
                        </button>
                    </div>

                </div>         
                
                <div style="height:inherit;width:30%">
                    
                </div>
        </div>
                     
            
                       <!-- 
                           
                            <ul v-for="user in users" :key="user.username" >
                            <li v-if="user.username !== $store.state.username && !peers[user.username]" 
                             @click="invitate(user.username)">{{user.username}}</li>
                             <li> <button >ToggleModal</button></li>
                        </ul>
                        
                        <select v-for="user in users" :key="user.username" style="margin-left: 17px;width: 73px;" name="iuoi" value="oioi">
                            
                            <option  
                                v-if="user.username !== $store.state.username && !peers[user.username]" 
                                @click="invitate(user.username)" >                                    
                                
                                <span >{{user.username}}</span>                           
                            </option>                            
                            
                        </select>-->
               
        
                        <sweet-modal ref="modal" width="550px">
                                <sweet-modal-tab title="General" id="tab1" >
                                
                                
                        <div  style="height:400px; width:100%; margin-top:-50px; margin-bottom:-50px; overflow-y:scroll;padding-right:5px">
                                    
                                        <div v-for="user in userList" :key="user.username" style="margin-bottom:1px; border:1px solid black;display: flex;justify-items: center;width: 100%;height: auto;background-color:white;border-radius: 10px ;">
                                            <div style=" display: flex;justify-content:flex-end; align-items:center; width: 12%;height: 55px;">
                                                <span class="rounded-circle" style="height: 50px;width:50px;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1; ">
                                                    <img class="img-fluid rounded-circle" :src="imageProfile+user.matricule" style="width:40px; height:40px" >
                                                    <span v-bind:class="user.status" class="rounded-circle " style="position: absolute;bottom: -1px;border: 4px solid white;right: -5px;display: inline-block;width: 15px;height: 15px">
                                                        
                                                    </span>
                                                </span>
                                                
                                            </div>
                                            <div style="width: 78%;height: auto;padding-left:1rem">
                                                <div style="width: 100%;height: auto;font-size:11px" >
                                                    <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Nom: <span style="font-weight:normal">{{ " "+user.username}} </span></span> <br>
                                                    <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Service: <span style="font-weight:normal">{{ user.service}} </span> </span ><br>
                                                    <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Fonction:<span style="font-weight:normal" > {{user.fonction}} </span></span>
                                                </div>
                                            </div>
                                            <div style="width:10%;display:flex; justify-content:center; align-items:center; ">
                                                <input style="width:20px;height:20px" type="checkbox" v-model="usersInvited" :value="user.username" />
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    
                                
                                </sweet-modal-tab>
                                    
                                <sweet-modal-tab title="Service" id="tab2" >
                                
                                
                                
                            <div style="height:400px;width:100%;margin-top:-50px; margin-bottom:-50px ;overflow-y:scroll;padding-right:5px">
                           
                            <div v-for="(service,index) in services" :key="index"  style="border:1px solid black;display: flex;justify-items: center;width: 100%;height: auto;background-color:white;border-radius: 10px ;">
                                <div style="display: flex;justify-content:flex-end; align-items:center; width: 12%;height: auto;">
                                    <span class="rounded-circle" style="height: 50px;width:50px;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1; ">
                                        <img class="img-fluid rounded-circle" :src="imagePath"  width="inherit" height="inherit" >
                                    </span>
                                    
                                </div>
                                <div style="width: 78%;height: auto;padding-left:1rem">
                                    <div style="padding-top:10px;width: 100%;height: auto; font-size:11px" >
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Service: <span style="font-weight:normal">{{ service.name}} </span> </span ><br>
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Description:<span style="font-weight:normal" > {{service.description.substring(0,50)+"..."}} </span></span>
                                    </div>
                                </div>
                                <div style="width:10%;display:flex; justify-content:center; align-items:center; ">
                                    <input style="width:20px;height:20px" type="radio" v-model="pickedInvitedUser" :value="service.name"/>
                                </div>
                            </div>
                              
                              
                        </div>
                    
                    
                    </sweet-modal-tab>
                    
                   
                    <template slot="button">
                        <button class="btn btn-primary" v-on:click="toggleModalToInvitePeople('close')" >Inviter</button>                         
                    </template> 
            </sweet-modal>        
        
    </div>
</template>
<script>
import { url } from "./../../../utils/config"
import axios from "axios"
import { SweetModal, SweetModalTab  } from 'sweet-modal-vue'

var JQuery=require("jquery")
  window.JQuery=JQuery;
  window.$=JQuery;

export default {
    name:"ConferenceControle",
    data:()=>({
          imageProfile:"",
          usersInvited:[],
          pickedInvitedUser:"",
          services:[],
          imagePath:`${url}/profile/image?matricule=121`,
         
    }),
    props:{
        
        conference:Object,
        peersLength:Number,
        peers:Object,
        users:Array,

    },
    async mounted(){
        this.imageProfile= await `${url}/profile/image?matricule=`
        this.init()
             
       
       
  },
    components:{
        SweetModal,
		SweetModalTab
       
    },

    methods:{

       async init(){

             await axios.get(`${url}/services`).then((response)=>{
                 this.services=response.data.services

        })  
        },

        invitate(user){

          this.$emit("invitation",user)
          console.log("Invitation sent")
        },

        displayType(typeOfDisplay){

          this.$emit("displayType",typeOfDisplay)
        },
        toggleModalToInvitePeople(event){
               

            this.init()
            if(event!=="close"){

                this.$refs.modal.open('tab1')

            } 
              
            
            else{

                this.$refs.modal.close()
                
                   this.usersInvited.forEach((user)=>{

                            this.$emit("invitation",user)
                        //     setTimeout(function(){
                        //         console.log("salut")
                        //    },500)

                   })

                //console.log("picked value",this.pickedInvitedUser)
                  // this.registerMeeting()
            }

        },        
        
        accept(){

          this.$emit("acceptInvitaion")
        },
        

       
    },computed: {
    
    userList: function()  {

      let currentUsername=this.$store.state.username
      return this.users.filter(function (user) {

              console.log("username from array",user.username)
              console.log("hey username",currentUsername)

              return currentUsername !== user.username
      })

    }
  
  }
    
}

</script>
<style lang="scss" scoped >

.available {
    background-color:#05b105 !important;
  }
.absent {
    background-color:#f7bb04 !important;
    
  }
.unavailable {
    background-color:#bb0000 !important;
   
  }


</style>