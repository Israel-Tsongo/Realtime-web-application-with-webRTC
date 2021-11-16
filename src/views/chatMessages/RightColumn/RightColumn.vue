
<template>

<!--########   Right main column ,  List of  Allmessages  #######--> 
                                              
    <div v-if="openPrivateChat" class="col-md-8 col-lg-8 col-xl-7 col-allMessages">
        <div id="mainDiv-allMessages">
        
            <!--################  Message info  ####################-->
            
            <InfoMessage v-bind:allPrivateChatInfo="allPrivateChatInfo" :users="users" @closeIt="closeChat()" @onAudioCall="audioCall()" @onVideoCall="video(true)"></InfoMessage>
            
            <!--################  Messages  ####################-->
            
            <div  id="messages-content-mainDivWithContact"  class="messages-content-mainDiv">
                 
                    <NewChatArea 
                        v-bind:messages="allPrivateChatInfo.msg">                         
                    </NewChatArea>                                                       
                
                <!--################  Input div  ####################-->
                
                <div id="inputAndSend-div">
                    <div class="row" style="justify-content: center;">
                        <div class="col-xl-12">
                            <div id="div-Inside-inputAndSend">
                            
                                <!--#####  Input   ####-->                                                            
                                    <InputMsg                                     
                                         v-bind:allPrivateChatInfo="allPrivateChatInfo">                                    
                                    </InputMsg>                                                                      
                                <!--#####  End  Input   ####-->
                            </div>
                        </div>
                    </div>
                </div>
                <a class="border rounded d-inline scroll-to-top" id="top-btn" href="#page-top"><i class="fas fa-angle-up"></i></a>
            </div>            

        </div>
    </div>
    <!--<div v-else id="messages-content-mainDivWithNoselect" class="messages-content-mainDiv">
        <div style="position: absolute;top: 35%;left: 28%;font-size: 30px;font-weight: 700;width: 30rem;text-align: center;height: 10rem;">
            <span style="display: inline-block;">
                <i class="fas fa-user-friends" style="font-size: 6rem;"></i>
            </span>
            <p style="color: var(--primary);font-weight: 400;">Veillez selectionner un contact</p>
        </div>
    </div>-->

</template>

<script>
import InfoMessage from "./InfoMessage.vue"
import InputMsg from "./InputMsg.vue"
import NewChatArea from "./NewChatArea.vue"
import Toasted from 'vue-toasted'
import Vue from 'vue'
import { WS_EVENTS, DESCRIPTION_TYPE } from "./../../../utils/config"



   export default {
 
   name:"RightColumn",
   
   components:{ InfoMessage, InputMsg,NewChatArea},

   props:{       
       openPrivateChat:Boolean,
       allPrivateChatInfo:Object,
       users:Array
       
       
   },

   sockets: {
        privateMessagePCSignaling: function({ desc, from, candidate }) {
            if (from === this.$store.state.username) return

                if (desc) {
                    if (desc.type === DESCRIPTION_TYPE.offer) { // If we have an income call
                        this.openChat(desc, from)
                    } else if (desc.type === DESCRIPTION_TYPE.answer) { // If we have a response
                        this.videoAnswer = { ...this.videoAnswer, remoteDesc: desc }
                    } else {
                        console.log("Unsupported SDP type")
                    }
                    // Candidate
                } else if (candidate) {
                        this.videoAnswer = { ...this.videoAnswer, candidate }
                    // Other peer has closed the video
                } else {
                        this.videoCall = false
                        this.$emit("videoCallStatus",{state:this.videoCall})
                }
        }
    },
    data: function() {
        return {
           // privateMessage: "",
            videoCall: false,
            videoAnswer:{
                video: undefined,
                remoteDesc: undefined,
                candidate: undefined,
                close: false
            },
            
            
        }
    },

   methods:{

       videoTypeOfCall(type){
           this.$emit("click",type)
           
       },
    
       closeChat() {
            this.videoCall = false
            this.$emit("videoCallStatus",{state:false})
            this.$socket.emit(WS_EVENTS.leavePrivateRoom, {
                room: this.$store.state.room,
                to: this.allPrivateChatInfo.room,
                from: this.$store.state.username
      })
        this.$emit("close-chat")
    },
    openChat(description, from){
        this.videoAnswer = { ...this.videoAnswer, video: true, remoteDesc: description, from }
        

          
              
            Vue.use(Toasted, {
              
              duration:50000,
              position: 'top-center',
              theme:'bubble',
              type:'info',
              icon:'check',  
              fullWidth:true,
              
              action:[
                    
                    {  
                      text:'Decline',
                      onClick:(e,toastObject)=>{
                        toastObject.goAway(0);
                      }
                    }, 
                    { 
                      text:'Acccept',
                      onClick:(e,toastObject)=>{
                          

                            this.videoCall = true
                            this.$emit("videoCallStatus",{state:true})
                            this.$emit("clickForcall",{typeOfCall:'Video'})
                            this.$emit("changeScreen",{screen:"PrivateChat"})
                            toastObject.goAway(0)

                      }
                    }
                ]  
  
            })

            this.$toasted.show('On souhaite vous joindre par appel video')            
           


    },
    
    audioCall(){
        this.$emit("clickForcall",{typeOfCall:'Audio'}) 

    },
    video(value) {
             console.log("toggle video with value=",value)
            this.$emit("clickForcall",{typeOfCall:'Video'})
  
            this.videoCall = value
            this.$emit("videoCallStatus",{state:this.videoCall})
            if (value){
                this.videoAnswer = { ...this.videoAnswer, video: !value }                
                
            } 
            else this.sendPrivateMessage({join:true,msg:`${this.$store.state.username} has closed the video`})
        
    },

    sendPrivateMessage(msg) {
      // Do not send empty messages
      if(typeof msg !== "object" && this.privateMessage.replace(/\s/g, "").length === 0) return

      this.$socket.emit(WS_EVENTS.privateMessage, {
        privateMessage: msg,
        to: this.allPrivateChatInfo.user,
        from: this.$store.state.username,
        room: this.allPrivateChatInfo.room
      })
      this.privateMessage = ""
    },


   },
   
   
   watch: {
    allPrivateChatInfo: function({ chat,user }, oldVal) {
        console.log("Chat",chat)
      if (chat && (chat !== oldVal.chat) ) { // if chat exist and chat different to the old chat then ..
        
        // Peer openning private chat
        if (this.allPrivateChatInfo.room !== this.$store.state.username){ // In private chat the room name is equal to the username of the initiator
            this.$socket.emit(WS_EVENTS.joinPrivateRoom, {
              ...this.$store.state,
              to: user,
              matricule: this.$store.state.matricule,
              from: this.$store.state.username,
            })
             console.log('chat changed test end emited',user)
        }
        // Peer receiving a private chat request
        if (this.allPrivateChatInfo.room === this.$store.state.username) {
            this.$socket.emit(WS_EVENTS.joinPrivateRoom, {
                ...this.$store.state,
                // to: this.allPrivateChatInfo.user, 
                to: this.$store.state.username,
                matricule:this.$store.state.matricule, 
                from: this.$store.state.username,
                joinConfirmation: true
            })
            console.log('chat changed 3 end emited')
        }
      }
    },
    videoAnswer:function(){

        console.log("The video answer in RightColumn",this.videoAnswer)
        this.$emit("videoAnswerUpdate",this.videoAnswer)
    }


  }

}

</script>

<style>
</style>
