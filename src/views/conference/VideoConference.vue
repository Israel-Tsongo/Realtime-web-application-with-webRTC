
<template>

   
    <div class="container-fluid" >
    
        <div style=" border: 5px solid black; height: 700px ;width: 100%;display: flex;align-items: center;justify-content: center;position: relative;">
            <div id="conferenceErea" style="height: 550px ;width: 53rem;display: inline-block;padding-right: 0.5rem;margin-right: 2rem;margin-top: -8rem;">
               
                <button id="startVideoConferenceBtn" v-if="!conference.open"  @click="toggleConference()" class="btn btn-primary">start video call</button>
              
               <Conference  
                    v-if="conference.open" 
                    :file="file"      
                    :conference="conference" 
                    :typeOfDisplay="typeOfDisplay"
                    :users="users"
                    @shareScreenEvent="updateConferenceData($event)"
                    @signal-SharingFile="signalSendingFile()">                
                
                </Conference>

               <BtnConferenceControle 
                  v-if="conference.open"
                  @shareScreen="shareScreenMethod()"
                  :conference="conference"                   
                  :typeOfDisplay="typeOfDisplay">
               </BtnConferenceControle>          
            
                <div v-if=" conference.open && typeOfDisplay=='MultiVideoConference'" style="height: 220px;width: 50px;align-items: flex-end;position: absolute;background: rgba(103,138,226,0.49);border-radius: 30px;bottom: -12%;left: -7%;">
                    <input type="range" style="position: relative;width: 153px;height: 65px;bottom: -26%;left: -105%;transform: rotateZ(-90deg);">
                    <div class="input-field" style="height: auto;position: absolute;bottom: 3%;left: 3%;">
                        <span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;">
                            <i class="fa fa-volume-up rounded-circle" style="background: #f8fafd;color: rgb(0,0,0);opacity: 0.72;"></i>
                        </span>
                    </div>
                </div>
            </div>
            <ChatConference                 
                :messages="messages" 
                :maxMessageLength="90" 
                :chatContainer="'scrollableDiv'"
                @send-message="sendMessage($event)"
                @share-file="affecteFile($event)">
                
            </ChatConference>
        </div>

    </div>

</template>

<style lang="css">

        #conferenceErea{
        position:relative

        }
        #startVideoConferenceBtn{

         position: absolute;
            top: 42%;
            left: 43%;
       

  }



</style>

<script>
import Conference from "./mainComponents/Conference.vue"
import ChatConference from './mainComponents/ChatConference.vue'
import BtnConferenceControle from './mainComponents/BtnConferenceControle.vue'

export default {
  name: "chat",
  props:{
    conference:Object,
    users:Array,
    messages:Array,
    typeOfDisplay:String,
    file:File

  },
  components:{ 
                     
        Conference,
        ChatConference,
        BtnConferenceControle 
  },
  methods:{

   sendMessage(data){

      this.$emit("send-message",data)

   },
   affecteFile(data){
      this.$emit("share-file",data)

   },
   shareScreenMethod(data){
      this.$emit("shareScreen",data)

   },
   signalSendingFile(){
     this.$emit("signal-SharingFile")


   },
   updateConferenceData(data){
          this.$emit("shareScreenEvent",data)

   },
   toggleConference(){
        this.$emit("toggleConference")
   }



  }



}






// import { STORE_ACTIONS, WS_EVENTS, DESCRIPTION_TYPE } from "./../utils/config"
// import Conference from "./conference/Conference.vue"
// import ChatConference from './conference/ChatConference.vue'
// import BtnConferenceControle from './conference/BtnConferenceControle.vue'
// //import Vue from 'vue'
// //import Conference from '../components/conference/Conference.vue'

// export default {
//     name:"VideoConference",
//     components:{ 
                     
//             Conference,
//             ChatConference,
//             BtnConferenceControle 
//             },
//     sockets: {
//     newUser: function({users, username}) {
//       const isMe = this.$store.state.username === username
//       if (users.length > this.users.length) {
//         this.messages.push({join: true, msg:`${!isMe ? username : 'You'} joined the room`})
//       } else if(users.length < this.users.length) {
//         this.messages.push({join: true, msg:`${username} left the room`})
//       }
//       this.users = [...users]
//     },

//     newMessage: function({ message, username }) {
//       const isMe = this.$store.state.username === username
//       const msg = isMe ? ` ${message}` : {username, message}
//       this.messages.push({ msg, isMe })
//     },

//     privateChat: function({ to, from }) {
//       if (this.$store.state.username !== to || this.openPrivateChat.chat) return // je doute: plutot (!openPrivateChat.chat) 
//       //Open chat when the other peer opens it
//       this.openPrivateChat = { ...this.openPrivateChat,
//         chat: true,
//         user: from,
//         room: to
//       }
//     },

//     privateMessage: function({ privateMessage, to, from }) {
//       const isObj = typeof privateMessage === "object"
//       const isFromMe = this.$store.state.username === from
//       if (isObj && isFromMe) return

//       this.openPrivateChat.msg.push({
//         msg: isObj ? privateMessage.msg : privateMessage,
//         isMe: this.$store.state.username !== to
//       })
//     },

//     leavePrivateRoom: function({ privateMessage }) {
//       if (this.openPrivateChat.closed) return
//       this.openPrivateChat.msg.push({ msg: privateMessage })
//       this.openPrivateChat = { ...this.openPrivateChat, closed: true }
//     },

//     leaveChat: function({ users, message }) {
//       this.messages.push({join: true, msg: message})
//       this.users = [...users]
//     },

//     PCSignalingConference: function({ desc, from, to, candidate }) {
//       if (from === this.$store.state.username || (!!to && to !== this.$store.state.username)) return

//       if (desc) {
//         if (desc.type === DESCRIPTION_TYPE.offer) 
//           this.conference = { ...this.conference, offer: { from, desc }, open: true }
//         else if (desc.type === DESCRIPTION_TYPE.answer) 
//           this.conference = { ...this.conference, answer: { from, desc } }
//       } else if (candidate) {
//         this.conference = { ...this.conference, candidate: { from, candidate } }
//       } 
//     },

//     conferenceInvitation: function({ to, from, message}) {
      
//       if (message && (this.$store.state.username === from)) return this.$toastr.w(message)
//       if (this.$store.state.username !== to) return     

//       if (this.$store.state.username == to){
//         this.saveInvitationData({to,from})
//         this.$toasted.show('You are invited')
         
//         // this.conference.room = from
//         // this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
//         //   to: from,
//         //   from: this.$store.state.username
//         //   })

//       }
      
//     },
//     updateConferenceScreenData:function({usr,shareSrn}){
//       this.conference={...this.conference,shareSreenInfo:{userFrom:usr,shareScreen:shareSrn}}

//     },
//     sendingFile:function({shareFileInfo}){
//       this.conference={...this.conference,shareFileInfo:{...shareFileInfo} }
//       console.log("====shareFileInfo====",this.conference.shareFileInfo)

//     },

//     joinConference: function({ from }) {
//       if (this.$store.state.username === from ) return
//       this.conference = { ...this.conference, user: from, userLeft: null,open:true }   
//     },

//     leaveConference: function({ from }) { // From equal to Me to equal to the initiator
//      from === this.conference.room 
//           ? this.conference = {} 
//           : this.conference = {...this.conference, userLeft: from, user: null }
//     }
//   },

//   //////
//   beforeCreate: function() {
//     this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
//   },
  
//   data: function() {
//     return {
//       room: this.$store.state.room,
//       joinConference:false,
//       invitationData:{
//         from:"",
//         to:""
//       },
//       users: [],
//       messages: [],
//       file:undefined,     
//       typeOfDisplay:"MonoVideoConference",
//       openPrivateChat: {
//         chat: false,
//         user: null,
//         msg: [],
//         room: null,
//         closed: false
//       },
//       conference: {
//         admin: false,
//         user: '',
//         room: '',
//         offer: null,
//         answer: null,
//         candidate: null,
//         open: false,
//         userLeft: '',
//         shareSreenInfo:{
//           userFrom:'',
//           shareScreen:false
//         },
//         shareFileInfo:{
//             userFrom:"",
//             shareFile:false,
//             fileName:" ",
//             fileSize:Number, 
//             fileType:undefined, 
//             fileLastModif:undefined
//           }
//       }
//     }
//   },
//  created(){
      
//       //this.toggleConference()
//   },
//   mounted(){
//           console.log("query value.value=",this.$route.query.value)
//         if(this.$route.query.value!==undefined){

//           this.joinConference=this.$route.query.value
//         }
         
//   },
 
//   methods: {
//     saveInvitationData({from,to}){
//       this.invitationData={from,to}

//     },
//     conferenceInvitationJoin({from}){
//               this.conference.room = from
//               this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
//                 to: from,
//                 from: this.$store.state.username
//                 })

//     },
//     onChangeRoom(val) {
//       if (this.room === val) return
//         this.$socket.emit(WS_EVENTS.leaveRoom, this.$store.state)
//         this.$store.dispatch(STORE_ACTIONS.changeRoom, val)
//         this.messages.length = 0
//         this.$socket.emit(WS_EVENTS.joinRoom, this.$store.state)
//     },
//     sendMessage(msg) {
//        console.log("Salut le messags")
//         this.$socket.emit(WS_EVENTS.publicMessage, { ...this.$store.state, message: msg })
//     },
//     openChat(user) {
//         this.openPrivateChat = { ...this.openPrivateChat,
//         chat: true,
//         user: user,
//         room: user // The room is the username of the initiator
//       }
//     },
//     closePrivateChat() {
//         this.openPrivateChat = { ...this.openPrivateChat,
//           chat: false,
//           closed: false,
//           user: null,
//           msg: [],
//           room: null
//       }
//     },
//     async logout() {
//       try {
//         this.$socket.emit(WS_EVENTS.leaveChat, {
//           room: this.room,
//           username:this.$store.state.username
//         })
//         await this.$store.dispatch(STORE_ACTIONS.leaveChat, this.$store.state.username)
//         this.$socket.close()
//         this.$router.push("/login")
//       } catch (error) {
//         console.log(error)
//       }
//     },
//     toggleConference() {
//       !this.conference.open 
//         ? this.conference = {...this.conference, open: true, admin: true, room: this.$store.state.username}
//         : this.conference = {}
//     },
    
    
//     updateConferenceData({usr,shareSrn}){
            
//            this.$socket.emit("updateConferenceScreenData",{usr,shareSrn,room:this.conference.room})
      
//     },
//     affecteFile({file}){
//           this.file=file
          
//     },
//     signalSendingFile(){
//           const shareFileInfo={
//             userFrom:this.$store.state.username,
//             shareFile:true,
//             fileName:this.file.name, 
//             fileSize:this.file.size, 
//             fileType:this.file.type, 
//             fileLastModif:this.file.lastModified
//           }
//           this.$socket.emit("sendingFile", {shareFileInfo, room:this.conference.room })
//            // console.log("Sendig file called",this.file)
            
//     },

   
//   },
//   watch:{


//     joinConference:function(newValue,oldValue){

//       if(newValue=='JoinIt'&& newValue !== oldValue)
//       {
//        this.conferenceInvitationJoin(this.invitationData)
//       }
//     }
//   }        
 
//}

</script>
