<template>

        <div style="width:inherit;height:inherit">

           <!-- <div>{{this.peers}}</div>

             <a id="download"><button class="btn btn-primary">click</button> </a>
             {{downloadAnchor}}-->
            <conference-controle
              v-if="conference.open" 
              @invitation="invitate($event)" 
              @displayType="displayType($event)" 
              :users="users"
              :peersLength="peersLength" 
              :conference="conference" 
              :peers="peers">
              </conference-controle>

            <MultiVideoConference

               v-if="conference.open && typeOfDisplay==='MultiVideoConference'"
              :users="users"              
              :conference="conference"               
              :localVideoStream="localStream"
              :localPauseVideo="pauseVideo"
              :localPauseAudio="pauseAudio"              
              :peers="peers" >             
                            
              </MultiVideoConference>
               <BtnConferenceControle 
                  v-if="conference.open"
                  @shareScreen="shareScreenMethod()"
                  @endCall="endCall()"
                  :localPauseVideo="pauseVideo"
                  :localPauseAudio="pauseAudio"
                  :conference="conference"                   
                  :typeOfDisplay="typeOfDisplay">
               </BtnConferenceControle> 

            <MonoVideoConference 
                v-if="false && typeOfDisplay==='MonoVideoConference'"
                :users="users" 
                :localVideoStream="localStream" 
                :conference="conference"               
                :localPauseVideo="pauseVideo"
                :localPauseAudio="pauseAudio"
                :peers="peers"
                @shareScreen="shareScreenMethod()" >              
                
            </MonoVideoConference>
        </div>
    
</template>

            
             
            

<script>
import { WS_EVENTS } from '../../../utils/config'
import { videoConfiguration } from '../../../mixins/WebRTC'
import MultiVideoConference from '../components/MultiVideoConference.vue'
import  MonoVideoConference from '../components/MonoVideoConference.vue'
import ConferenceControle from '../components/ConferenceControle.vue'
import BtnConferenceControle from './BtnConferenceControle.vue'

export default {

    name:"Conference",
    components:{ MultiVideoConference, MonoVideoConference,ConferenceControle, BtnConferenceControle  },
    props: {
    users: Array,
    typeOfDisplay:String,
    conference: Object,
    file:File  
    

  },
  mixins:[videoConfiguration],
  
  data: () => ({

    peers: {},
    peersLength: 0,
    shareScreen:false,
    dataChannels:{} ,
    isVideoStarted:false,
    MAXIMUM_MESSAGE_SIZE: 65535,
    END_OF_FILE_MESSAGE:'EOF',
    downloadAnchor:undefined,
    oldUser:''
    

    
  }),

  async mounted() {
    this.myVideo = document.getElementById("localVideo")
    //this.downloadAnchor = document.getElementById("download")
    // Admin join the room
    if (this.conference.admin) {
      await this.getUserMedia()
           
      this.$socket.emit(WS_EVENTS.joinConference, { ...this.$store.state,
        to: this.username
      })
    }
    // Offer
    if(this.conference.offer) {
      const { offer: { from, desc } } = this.conference  
       console.log("==offer==in mounted ==",this.conference.offer )    
      this.init(from, desc)
     
    }
  },
  beforeDestroy() {
    Object.values(this.peers).forEach(peer => peer.pc.close())
    this.peers = {}
    this.$socket.emit(WS_EVENTS.leaveConference, {  ...this.$store.state,
      from: this.username,
      conferenceRoom: this.conference.room
    })
  },
  methods: {
    async init(offer, desc) {
      
      await this.getUserMedia()
      this.initWebRTC(offer, desc)
    },
    invitate(user) {
      this.$socket.emit(WS_EVENTS.conferenceInvitation, {
        room: this.$store.state.room,
        to: user,
        from: this.username
      })
      console.log("invite",user)
    },
    initWebRTC(user, desc) {
    
      // Add new remote user

      console.log(`+++++ in initWebRTC user entrant: ${user} and desc entrant is:${desc}` )
      // On creer un object peer pour le nouveau utilisateur
      this.$set(this.peers, user, {
        username: user,
        pc: new RTCPeerConnection(this.configuration),
        peerStream: undefined,
        peerVideo: undefined
      })

       console.log(`+++++ in initWebRTC peers after init entrant: ${this.peers[user]}` )
       // on ajoute notre video(nous moderateur) sur l'object qui represente l'autre peer
          this.onIceCandidates(this.peers[user].pc, user, this.conference.room, true)
         this.addLocalStream(this.peers[user].pc)   
         this.onAddStream(this.peers[user], user)

          if(this.conference.admin){

          console.log("============= inside if(this.conference.admin)")

             const dataChannelNew =(user,pc)=>{
               return new Promise((resolve,reject)=>{
                   
                      const newDataChannel=pc.createDataChannel("chatFile")
                      newDataChannel.onopen=(event)=>{
                                try {
                                  if (event) {
                                    console.log("openeD")
                                    resolve({user:user,newDataChannel:newDataChannel})
                                  }
                        
                                 } catch (error) {
                                   reject(error)
                                 }
                      } }).then(({user,newDataChannel})=>{
                           console.log("newDataChannel for the se",newDataChannel)
                            console.log("for the user",user)
                            //newDataChannel.send("Hello from admin")
                            // newDataChannel.onmessage=function(event){
                            //   console.log("From other peer",event.data)
                            // }
                            newDataChannel.binaryType = 'arraybuffer';
                            this.setDataChannel(user,newDataChannel)

                      })
             }
             dataChannelNew(user,this.peers[user].pc)
                                
        }  


         if(!this.conference.admin){
            
             
            if(this.conference.user!==this.oldUser && this.conference.user!==undefined && this.conference.user!==''){

              //#############################DUPLICATE CODE#################################             


             const dataChannelNew =(user,pc)=>{
               return new Promise((resolve,reject)=>{
                   
                      const newDataChannel=pc.createDataChannel("chatFileForSimpleUser")
                      newDataChannel.onopen=(event)=>{
                                try {
                                  if (event) {
                                    console.log("openeD")
                                    resolve({user:user,newDataChannel:newDataChannel})
                                  }
                        
                                 } catch (error) {
                                   reject(error)
                                 }
                      } }).then(({user,newDataChannel})=>{
                           console.log("newDataChannel for the se",newDataChannel)
                            console.log("for the user",user)
                            //newDataChannel.send("Hello from admin")
                            // newDataChannel.onmessage=function(event){
                            //   console.log("From other peer",event.data)
                            // }
                            newDataChannel.binaryType = 'arraybuffer';
                            this.setDataChannel(user,newDataChannel)

                      })
             }
             dataChannelNew(user,this.peers[user].pc)

                      //##########################################


            }else{



          console.log("#############################DUPLICATE CODE#################################")

                  console.log("=-=-creating data chanell else=-=-== User :",user)
                    
                  const dataChannel =(user,pc)=>{
                    return new Promise((resolve,reject)=>{  
                            console.log("promise called")                 
                            pc.ondatachannel=(event)=>{
                              console.log("ondatachanel called")
                            const channel =event.channel                    
                            channel.onopen=(event)=>{
                              console.log("on open called")
                                      try {
                                        if (event) {
                                          console.log("console--event in promise")
                                          resolve({user:user,channel:channel})
                                        }
                              
                                      } catch (error) {
                                        reject(error)
                                      }
                                }
                            } }).then(({user,channel})=>{

                                  console.log("channel of recever",channel)
                                  console.log("dataChannel for",user)
                                  //.send("Hello from Israel")
                                  // channel.onmessage=function(event){
                                  //   console.log("From Heritier",event.data)
                                  // }
                                  //channel.binaryType = 'arraybuffer';
                                  this.setDataChannel(user,channel)

                            })
                  }


                  dataChannel(user,this.peers[user].pc)

            }


            
         }
      
   
      // Act accordingly
      desc 
        ? this.handleAnswer(desc, this.peers[user].pc, user, this.conference.room, true)
        : this.createOffer(this.peers[user].pc, user, this.conference.room, true)

          
          //this.onTrack(this.peers[user])
    },
    displayType(type){
      this.typeOfDisplay=type
    },
    setDataChannel(user,channel){

      this.$set(this.dataChannels,user, {
        dataChannel:channel
      })
      console.log("after seting DataChanel",this.dataChannels)
      console.log("after seting DataChanel",this.dataChannels[user].dataChannel)

    },
    
    
    
    //for Heritier
    async shareScreenMethod(){
        
        if(!this.conference.shareSreenInfo.shareScreen ||this.conference.shareSreenInfo.userFrom ==this.$store.state.username){
              
              if(this.localStream!==undefined){

                this.isVideoStarted=true 
              }

              this.shareScreen =!this.shareScreen

              await this.getUserDisplayMediaStream(this.shareScreen)

              for(const user in this.peers){ //user is all key from this.peers object           
                  
                  this.addLocalStream(this.peers[user].pc)

              }        
              
              this.$emit("shareScreenEvent",{userFrom:this.$store.state.username,shareSrn:this.shareScreen})

              console.log("Screen trigged")
        }else{

            this.$toastr.w("Someone is sharing his screen please ask him to desable his screen before you start")

        }
    },


  },
  watch: {
    conference: function({ user, answer, candidate, userLeft, offer,shareSreenInfo,shareFileInfo }, oldVal) {
      if(userLeft && userLeft !== oldVal.userLeft) {
        this.peersLength--        
        this.peers[userLeft].pc.close()
        delete this.peers[userLeft]
      }
      // New user
      if(user && user !== oldVal.user) {
        this.oldUser=oldVal.user
        console.log("++++++++++++++++++++++++OldUser",oldVal.user,"newUser",user)
        this.initWebRTC(user)
        this.peersLength++
       
        this.$emit("updatePeersLength",this.peersLength)
      }
      

        // Recever of sharing
        
      if(shareSreenInfo.shareScreen && (shareSreenInfo !== oldVal.shareSreenInfo) && (shareSreenInfo.userFrom !== this.$store.state.username)) {
        
            this.onAddStream(this.peers[shareSreenInfo.userFrom], user)         
        
      }
      if(shareFileInfo.shareFile && (shareFileInfo.userFrom !== this.$store.state.username)) {
        
            console.log("The other peers leasning for ON_RECEVE EVENT")
            console.log("who share file",shareFileInfo.userFrom)
            console.log(this.peers[shareFileInfo.userFrom].pc)
           // this.onReceveFile(this.peers[shareFileInfo.userFrom].pc)
             console.log("this.dataChannels",this.dataChannels)
           console.log("==this.dataChannel==== when Receving=========",this.dataChannels[shareFileInfo.userFrom].dataChannel)
          
            //this.onSendFile(this.dataChannel) 
            this.onReceveFile(this.dataChannels[shareFileInfo.userFrom].dataChannel)          
                  
        
      }


      // Handle answer
      if(answer && oldVal.answer !== answer) {
        this.setRemoteDescription(answer.desc, this.peers[answer.from].pc)
      }
      // Add candidate
      if (candidate && (oldVal.candidate !== candidate) && this.peers) {

          
         if(this.peers[candidate.from]!==undefined) {
           this.addCandidate(this.peers[candidate.from].pc, candidate.candidate)
         } 

              
      }

     
     // New offer
      if(offer && (offer !== oldVal.offer) && (oldVal.offer !== undefined)){
        const { from, desc } = offer
         console.log("==offer==in watch ==",offer )
        this.init(from, desc)
      }

    },
    file:function(newValue,oldValue){
               console.log("The file",this.file)

              if(this.file!==undefined || newValue !== oldValue){                    

                console.log("==this.dataChannel", this.dataChannels)
                for(const channelName in this.dataChannels){ //user is all key from this.peers object           
                    console.log("The sender start to send his File")

                //this.dataChannel= this.peers[user].pc.createDataChannel("chatFile")
                 
                console.log("==this.dataChannel==== when Sending=========",this.dataChannels[channelName].dataChannel)
                this.onSendFile(this.dataChannels[channelName].dataChannel) 
                // this.onReceveFile(this.dataChannel)
                // console.log(" after initialisation now dataChannel is ",this.dataChannel)
                // this.dataChannel.send("salut from admin")
                // this.dataChannel.onmessage=function(event){
                //     console.log("the data channel",event.data)

                  }

                
                        
                                
                    
                    // if(this.dataChannel!==undefined){
                    //       //this.dataChannel= this.peers[user].pc.createDataChannel("chatFile")
                        
                    //     this.onSendFile(this.dataChannel) 
                    //     console.log("now dataChannel 2 is",this.dataChannel)
                    //      
                    // } else{ 
             
                    //     console.log("data chanel is undefined")
                    // }

                   }       
  
              // }
    },
    // downloadAnchor:function(newValue){
    //    console.log(" before downloadAnchor is",newValue)
    //    console.log("before downloadAnchor is",this.downloadAnchor)

    //       if(newValue!==undefined){
    //                console.log("downloadAnchor is",newValue)
    //                console.log("downloadAnchor is",this.downloadAnchor)
    //                 this.$emit("downloadAnchor",newValue)
    //       }

    // }
  }

}
</script>
<style>

</style>
