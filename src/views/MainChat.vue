
<template>

  

<div id="content" style=" margin-top:60px" >
        
        
<!--######### navbar  ##########-->      
        
    <Navbar v-bind:imgProfile="this.imageProfile" @changeScreen="changeActualScreen($event)" @logout="logout()"> </Navbar>  
                         
<!--######## End navBar ##########--> 

            <HomeApp v-if="screen =='Home'" ></HomeApp>
             <Profile @changeImageProfile="changeImageProfile()" v-if="screen =='Profile'"> </Profile> 
            <AdminPage v-if="screen =='AdminPage'"  ></AdminPage>

            <div v-if="screen =='PrivateChatScreen'"  class="container-fluid">

                <section id="main-section">             

                    <div class="row d-xl-flex" id="main-row">
                        <div class="col-lg-8 col-xl-12 d-xl-flex justify-content-xl-center align-items-xl-center">
                            <div class="card" id="main-card" >
                                <div class="card-body" id="mainCardBody" >
                                    <div id="mainDivMsg">
                                        <div class="row" id="rowMsg" >                                               
                                            
                                            <!--#########   Left main column ,  List of  Contact  ###############--> 
                                                <LeftColumn v-bind:imgProfile="this.imageProfile" :users="users" :openPrivateChat="openPrivateChat.chat || conference.open" @open-chat="openChat($event)"> </LeftColumn>                                                
                                           <!--######  End LeftColumn  ######-->                                                
                                                
                                            <!--#############   Right main column ,  List of  Allmessages  #######--> 
                                                    
                                                <RightColumn 
                                                    ref="closeRef" 
                                                    :v-if="openPrivateChat.chat" 
                                                    :users="users"                                                                                               
                                                    v-bind:openPrivateChat="openPrivateChat.chat" 
                                                    v-bind:allPrivateChatInfo="openPrivateChat" 
                                                    @videoAnswerUpdate="updateVideoAnswer($event)"                                                
                                                    @clickForcall="open($event)"> 
                                                </RightColumn> 
                                                 
                                            <!--######  End RightColumn ######-->
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>         
                    
                    <!--######### Video modal  ##########--> 

                   
                        <div v-if="videoCall" class="modal fade show" role="dialog" tabindex="-1" id="videoCallModal">
                            <div class="modal-dialog" role="document" style="max-width: 650px">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Appel video&nbsp;</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close('Video')"><span aria-hidden="true">×</span></button>
                                    </div>
                                                    
                                        <!--#####Video modalbody  ####--> 

                                        <div class="modal-body" id="video-modal-body">
                                           <VideoModal                                            
                                                v-bind:videoAnswer="videoAnswer"
                                                :room="openPrivateChat.room" 
                                                :to="openPrivateChat.user"> 
                                            </VideoModal>                                    
                                                                                      
                                        </div> 

                                        <!--##### End Video modal body ####-->

                                        <div class="modal-footer" id="video-modal-footer">
                                            <button class="btn btn-primary" id="video-modal-btn-fermer" type="button" data-dismiss="modal" @click="close('Video')">Fermer</button>
                                        </div>                                           

                                    </div>
                            </div>
                    </div>

                    <!--######### Audio modal  ##########--> 

                    <div v-if="audioCall" class="modal fade show" role="dialog" tabindex="-1" id="audioCallModal" >
                            <div class="modal-dialog" role="document" id="sizesAudioModal">                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Appel video</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close('Audio')"><span aria-hidden="true">×</span></button>
                                    </div> 
                                                
                                    <!--##### Audio modalbody  ####--> 

                                    <div class="modal-body" id="modal-audio">
                                        <Audio 
                                            v-bind:videoAnswer="videoAnswer"
                                            :room="openPrivateChat.room" 
                                            :to="openPrivateChat.user">                               
                                        </Audio>                                        
                                                                                    
                                    </div> 

                                    <!--##### End Audio modal body ####-->

                                    <div class="modal-footer" >
                                        <button class="btn btn-primary"  type="button" data-dismiss="modal" @click="close('Audio')">Fermer</button>
                                    </div>                                           

                                </div>
                        </div>
                    </div> 



          
                </section>
            </div>
            <VideoConference

                v-if="screen ==conference.open ||'ConferenceScreen'"                 
                :users="users"
                :conference="conference"
                :messages="messages"
                :typeOfDisplay="typeOfDisplay"
                :file="file"                
                @resetAllConferenceData="resetAllConferenceData()"
                @toggleConference="toggleConference()"
                @send-message="sendMessage($event)"
                @share-file="affecteFile($event)"                
                @shareScreenEvent="updateConferenceData($event)"
                @signal-SharingFile="signalSendingFile()" ></VideoConference>
                

        </div>
  
</template>



<script >
import { STORE_ACTIONS, WS_EVENTS, DESCRIPTION_TYPE,url } from "../utils/config"  
import VideoConference from "./conference/VideoConference.vue" 
import Navbar from "./chatMessages/OtherComponents/Navbar.vue"
import LeftColumn from "./chatMessages/LeftColumn/LeftColumn.vue"
import RightColumn from "./chatMessages/RightColumn/RightColumn.vue"
import VideoModal from "./chatMessages/OtherComponents/VideoModal.vue"
import AdminPage from "./admin/AdminPage.vue"
import Profile from "./Profile.vue"
import HomeApp from "./HomeApp.vue"
import Audio from  './chatMessages/OtherComponents/Audio.vue' 
import Toasted from 'vue-toasted'
import Vue from 'vue'

var JQuery=require("jquery")
window.JQuery=JQuery;
window.$=JQuery;

export default {
    name:"MainChat",
    components:{
        Navbar,LeftColumn, RightColumn,VideoModal,Audio,
        VideoConference,AdminPage,Profile,HomeApp
    },

    sockets: {

        newUser: function({users, username}) {
        const isMe = this.$store.state.username === username
        if (users.length > this.users.length) {
            this.messages.push({join: true, msg:`${!isMe ? username : 'You'} joined the room`})
        } else if(users.length < this.users.length) {
            this.messages.push({join: true, msg:`${username} left the room`})
        }
        this.users = [...users]
        },

        newMessage: function({ message, username }) {

        const isMe = this.$store.state.username === username
        const msg = isMe ? {message:message} : {username, message} 
        console.log("=======",msg)       
        this.messages.push({ msg, isMe })

        },

        privateChat: function({ to, from,matricule }) {
        if (this.$store.state.username !== to || this.openPrivateChat.chat) return // je doute: plutot (!openPrivateChat.chat) 
        //Open chat when the other peer opens it
        this.openPrivateChat = { ...this.openPrivateChat,
            chat: true,
            matricule:matricule,
            user: from,
            room: to
        }
        },

        privateMessage: function({ privateMessage, to, from }) {
        const isObj = typeof privateMessage === "object"
        const isFromMe = this.$store.state.username === from
        if (isObj && isFromMe) return

        this.openPrivateChat.msg.push({
            msg: isObj ? privateMessage.msg : privateMessage,
            isMe: this.$store.state.username !== to
        })
        },

        leavePrivateRoom: function({ privateMessage }) {
        if (this.openPrivateChat.closed) return
        this.openPrivateChat.msg.push({ msg: privateMessage })
        this.openPrivateChat = { ...this.openPrivateChat, closed: true }
        },

        leaveChat: function({ users, message }) {
        this.messages.push({join: true, msg: message})
        this.users = [...users]
        },

        PCSignalingConference: function({ desc, from, to, candidate }) {
        if (from === this.$store.state.username || (!!to && to !== this.$store.state.username)) return

        if (desc) {
            if (desc.type === DESCRIPTION_TYPE.offer) 
            this.conference = { ...this.conference, offer: { from, desc }, open: true }
            else if (desc.type === DESCRIPTION_TYPE.answer) 
            this.conference = { ...this.conference, answer: { from, desc } }
        } else if (candidate) {
            this.conference = { ...this.conference, candidate: { from, candidate } }
        } 
        },

        conferenceInvitation: function({ to, from, message}) {
        console.log("Invitation receved")
        if (message && (this.$store.state.username === from)) return this.$toastr.w(message)
        if (this.$store.state.username !== to) return     

        if (this.$store.state.username == to){

             
              
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

                          

                          this.conference.room = from
                          this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
                          to: from,
                          from: this.$store.state.username
                          })

                           this.screen="ConferenceScreen"

                           toastObject.goAway(0)

                      }
                    }
                ]  
  
            })

            this.$toasted.show('Vous etes invite a participer a une video conference')            
           

        }
        
        },
        updateConferenceScreenData:function({userFrom,shareSrn}){
        this.conference={...this.conference,shareSreenInfo:{userFrom:userFrom,shareScreen:shareSrn}}

        },
        sendingFile:function({shareFileInfo}){
        this.conference={...this.conference,shareFileInfo:{...shareFileInfo} }
        console.log("====shareFileInfo====",this.conference.shareFileInfo)

        },

        joinConference: function({ from }) {
            console.log("in join conference from is",from)
        if (this.$store.state.username === from ) return
        this.conference = { ...this.conference, user: from, userLeft: null,open:true }   
        },

        leaveConference: function({ from }) { // From equal to Me to equal to the initiator
        from === this.conference.room 
            ? this.conference = {} //...this.conference,open:false,userLeft: from,user: null,admin:false,room:''
            : this.conference = {...this.conference, userLeft: from, user: null } // 
         console.log("conference open",this.conference)
        }
  },

  //////
  beforeCreate: function() {
      //console.log("this.$store.state",this.$store.state)
    this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
  },
  
  data: function() {
    return {
      screen:"Home",
      imageProfile:"",
      audioCall:false,
      videoCall:false,
      videoAnswer:{},
      room: this.$store.state.room,
      joinConference:false,
      invitationData:{
        from:"",
        to:""
      },
      users: [],
      messages: [],
      file:undefined,     
      typeOfDisplay:"MultiVideoConference",
      openPrivateChat: {
        chat: false,
        user: null,
        matricule:"",
        msg: [],
        room: null,
        closed: false
      },
      conference: {
        admin: false,
        user: '',
        room: '',
        offer: null,
        answer: null,
        candidate: null,
        open: false,
        userLeft: '',
        shareSreenInfo:{
          userFrom:'',
          shareScreen:false
        },
        shareFileInfo:{
            userFrom:"",
            shareFile:false,
            fileName:" ",
            fileSize:Number, 
            fileType:undefined, 
            fileLastModif:undefined
          }
      }
    }
  },
  created(){
     
      
  },
   mounted(){
      this.changeImageProfile()
         
  },
 
  methods: {

      resetAllConferenceData(){
         this.conference= {

                admin: false,
                user: '',
                room: '',
                offer: null,
                answer: null,
                candidate: null,
                open: false,
                userLeft: '',
                shareSreenInfo:{
                userFrom:'',
                shareScreen:false
                },

                shareFileInfo:{
                    userFrom:"",
                    shareFile:false,
                    fileName:" ",
                    fileSize:Number, 
                    fileType:undefined, 
                    fileLastModif:undefined
                }
            }
        
   },


      async changeImageProfile(){

            this.imageProfile= await `${url}/profile/image?matricule=${this.$store.state.matricule}`
            console.log(" this.getData() ")
      },
      changeActualScreen(screenName){
          this.screen=screenName

      },
       
       updateVideoAnswer(videoAnswer){
           
            this.videoAnswer=videoAnswer
       },
       open(typeOfCall) { 
            
            
            
            const styleDialog=document.querySelector(".modal-dialog")
            const titleModal=document.querySelector(".modal-title")                        

           
            if(typeOfCall==="Video"){
                
                    this.videoCall=true 
                    styleDialog.style.cssText="max-width:55rem" ;
                    titleModal.textContent="Appel Video"
                    JQuery(document).ready(function($){            
                    
                        $("#videoCallModal").show()                                        
               
                     })
            } 
            else if(typeOfCall==="Audio"){
                this.audioCall=true 
                this.$nextTick(function(){

                    
                    styleDialog.style.cssText="max-width: 30rem;max-height: 50rem";
                    titleModal.textContent="Appel audio"
                    JQuery(document).ready(function($){                   
                        $("#audioCallModal").show()            
                    })

                })
                   
            }            
        
        },

       close(type){
           
            //this.closePrivateChat()
            this.$refs.closeRef.closeChat()
            

            if(type==="Video"){
                 this.videoCall=false
                JQuery(document).ready(function($){                 
                     $("#videoCallModal").hide()              
                })
            }else if(type==="Audio"){
                 this.audioCall=false
                JQuery(document).ready(function($){            
                     $("#audocallModal").hide()           
                })

            }            
         
           
        },

    saveInvitationData({from,to}){
      this.invitationData={from,to}

    },
    conferenceInvitationJoin({from}){
              this.conference.room = from
              this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
                to: from,
                from: this.$store.state.username
                })

    },
    onChangeRoom(val) {
      if (this.room === val) return
        this.$socket.emit(WS_EVENTS.leaveRoom, this.$store.state)
        this.$store.dispatch(STORE_ACTIONS.changeRoom, val)
        this.messages.length = 0
        this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
    },
    sendMessage(msg) {
       console.log("Salut le messags",msg)
        this.$socket.emit(WS_EVENTS.publicMessage, { ...this.$store.state, message: msg })
    },
    openChat({user,matricule}) {
        this.openPrivateChat = { ...this.openPrivateChat,
        chat: true,
        matricule:matricule,
        user: user,
        room: user // The room is the username of the initiator
      }
    },
    closePrivateChat() {
        this.openPrivateChat = { ...this.openPrivateChat,
          chat: false,
          closed: false,
          user: null,
          msg: [],
          room: null
      }
    },
    async logout() {
      try {
        this.$socket.emit(WS_EVENTS.leaveChat, {
          room: this.room,
          username:this.$store.state.username
        })
        await this.$store.dispatch(STORE_ACTIONS.leaveChat, this.$store.state.username)
        this.$socket.close()
        this.$router.push({name:"login"})
      } catch (error) {
        console.log(error)
      }
    },
    toggleConference() {

      this.openPrivateChat.chat?this.closePrivateChat():""

      !this.conference.open 
        ? this.conference = {...this.conference, open: true, admin: true, room: this.$store.state.username}
        : this.conference = {}
    },
    
    
    updateConferenceData({userFrom,shareSrn}){
            
           this.$socket.emit("updateConferenceScreenData",{userFrom,shareSrn,room:this.conference.room})
      
    },
    affecteFile({file}){
          this.file=file
          
    },
    signalSendingFile(){
          const shareFileInfo={
            userFrom:this.$store.state.username,
            shareFile:true,
            fileName:this.file.name, 
            fileSize:this.file.size, 
            fileType:this.file.type, 
            fileLastModif:this.file.lastModified
          }
          this.$socket.emit("sendingFile", {shareFileInfo, room:this.conference.room })
           // console.log("Sendig file called",this.file)
            
    },

   
  },
  


}

</script>

<style lang="css" scoped >

       @import './chatMessages/assets/fonts/material-icons.min.css';
       @import './chatMessages/assets/css/styles.css';
       @import './chatMessages/assets/fonts/material-icons.min.css';
       @import './chatMessages/assets/fonts/ionicons.min.css';
       @import './chatMessages/assets/fonts/font-awesome.min.css';
       @import './chatMessages/assets/fonts/fontawesome-all.min.css';
       @import './chatMessages/assets/fonts/fontawesome5-overrides.min.css';
       @import './chatMessages/assets/bootstrap/css/bootstrap.min.css';
       @import './chatMessages/assets/css/chatMessage.css';
       @import './chatMessages/assets/css/fabStyle.css'
     
</style>


