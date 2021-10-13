
<template>

  
<!--<div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper" > -->
        <div id="content" >
        
        
<!--######### navbar ##########-->           
        
            <Navbar v-bind:imgProfile="this.imageProfile"> </Navbar>  
                        
<!--######## End navBar ##########-->           
            
            <div class="container-fluid">

                <section id="main-section">             

                    <div class="row d-xl-flex" id="main-row">
                        <div class="col-lg-8 col-xl-12 d-xl-flex justify-content-xl-center align-items-xl-center">
                            <div class="card" id="main-card" >
                                <div class="card-body" id="mainCardBody" >
                                    <div id="mainDivMsg">
                                        <div class="row" id="rowMsg" >                                               
                                            
                                            <!--#########   Left main column ,  List of  Contact  ###############--> 
                                                <LeftColumn v-bind:imgProfile="this.imageProfile" :users="users" :openPrivateChat="openPrivateChat.chat || conference.open" @open-chat="openChat"> </LeftColumn>                                                
                                           <!--######  End LeftColumn  ######-->                                                
                                                
                                            <!--#############   Right main column ,  List of  Allmessages  #######--> 
                                                    
                                                <RightColumn 
                                                    ref="closeRef"                                                                                                 
                                                    v-bind:openPrivateChat="openPrivateChat.chat" 
                                                    v-bind:allPrivateChatInfo="openPrivateChat" 
                                                    @videoAnswerUpdate="updateVideoAnswer($event)"                                                
                                                    @clickForcall="open($event)"> </RightColumn> 
                                                 
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
        </div>
    <!--</div>
 </div>-->
   
</template>




<script>

  import { STORE_ACTIONS, WS_EVENTS, DESCRIPTION_TYPE,url } from "./../../utils/config"  
  import Navbar from "./OtherComponents/Navbar.vue"
  import LeftColumn from "./LeftColumn/LeftColumn.vue"
  import RightColumn from "./RightColumn/RightColumn.vue"
  import VideoModal from "./OtherComponents/VideoModal.vue"
  import Audio from  './OtherComponents/Audio.vue'
  
  
  var JQuery=require("jquery")
  window.JQuery=JQuery;
  window.$=JQuery;

 export default {
 
   name:"Message",

   data:function(){

       return{
            
            imageProfile:"",
            room: this.$store.state.room,
            users: [],
            messages: [],
            audioCall:false,
            videoCall:false,
            videoAnswer:{},            
            openPrivateChat: {
                chat: false,
                matricule:"",
                user: null,
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
                userLeft: ''
            },

            
       }
   },
   
   components:{ Navbar,LeftColumn, RightColumn,VideoModal,Audio },
    // Before create
    async created(){
      console.log("Matricule",this.$store.state.matricule)
      this.imageProfile= await `${url}/profile/image?userMatric=${this.$store.state.matricule}`
    },
    beforeCreate: function() {
        this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
    },       

    // All signaling Socket

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
            const msg = isMe ? ` ${message}` : {username, message}
            this.messages.push({ msg, isMe })
        },

        privateChat: function({ to, from,matricule }) {
            if (this.$store.state.username !== to || this.openPrivateChat.chat) return // je doute: plutot (!openPrivateChat.chat) 
            //Open chat when the other peer opens it
            console.log("***data***",from)
            this.openPrivateChat = { ...this.openPrivateChat,
                chat: true,
                user: from,
                matricule:matricule,
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
            if (message && (this.$store.state.username === from)) return this.$toastr.w(message)
            if (this.$store.state.username !== to) return
            
            this.conference.room = from
            this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
                to: from,
                from: this.$store.state.username
            })
        },

        joinConference: function({ from }) {
            if (this.$store.state.username === from ) return
            this.conference = { ...this.conference, user: from, userLeft: null }   
        },

        leaveConference: function({ from }) { // From equal to Me to equal to the initiator
            from === this.conference.room 
                ? this.conference = {} 
                : this.conference = {...this.conference, userLeft: from, user: null }
        }
    },
      // End Signaling Socket
   methods:{
         
       
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
         // Others Method

        onChangeRoom(val) {
            if (this.room === val) return
            this.$socket.emit(WS_EVENTS.leaveRoom, this.$store.state)
            this.$store.dispatch(STORE_ACTIONS.changeRoom, val)
            this.messages.length = 0
            this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
        },
        sendMessage(msg) {
            this.$socket.emit(WS_EVENTS.publicMessage, { ...this.$store.state, message: msg })
        },
        openChat({user,matricule}) {
            this.openPrivateChat = { ...this.openPrivateChat,
                chat: true,
                user: user,
                matricule:matricule,
                room: user // The room is the username of the  other user 
            }
        },
        closePrivateChat() {
            this.openPrivateChat = { ...this.openPrivateChat,
                chat: false,
                closed: false,
                user: null,
                matricule:"",
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
                this.$router.push("/home")
            } catch (error) {
                console.log(error)
            }
        },
        toggleConference() {
            !this.conference.open 
                ? this.conference = {...this.conference, open: true, admin: true, room: this.$store.state.username}
                : this.conference = {}
        },    
   },
  
      
}


</script>

<style lang="css" scoped >

       @import './assets/fonts/material-icons.min.css';
       @import './assets/css/styles.css';
       @import './assets/fonts/material-icons.min.css';
       @import './assets/fonts/ionicons.min.css';
       @import './assets/fonts/font-awesome.min.css';
       @import './assets/fonts/fontawesome-all.min.css';
       @import './assets/fonts/fontawesome5-overrides.min.css';
       @import './assets/bootstrap/css/bootstrap.min.css';
       @import './assets/css/chatMessage.css';
       @import "./assets/css/fabStyle.css"
     
</style>

