<template>

        <div style="width:auto;height:auto">
            <div>{{this.peers}}</div>
             <a id="download"><button class="btn btn-primary">click</button> </a>
            <conference-controle 
              @invitation="invitate($event)" 
              @displayType="displayType($event)" 
              :users="users"
              :peersLength="peersLength" 
              :conference="conference" 
              :peers="peers">
              </conference-controle>

            <MultiVideoConference
               v-if="typeOfDisplay==='MultiVideoConference'"
              :users="users"              
              :conference="conference"               
              :localVideoStream="localStream"
              :localPauseVideo="pauseVideo"
              :localPauseAudio="pauseAudio"              
              :peers="peers" >             
                            
              </MultiVideoConference>

            <MonoVideoConference 
                v-if="typeOfDisplay==='MonoVideoConference'"
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
import { WS_EVENTS } from '../../utils/config'
import { videoConfiguration } from './../../mixins/WebRTC'
import MultiVideoConference from './MultiVideoConference.vue'
import  MonoVideoConference from './MonoVideoConference.vue'
import ConferenceControle from './ConferenceControle.vue'

export default {

    name:"Conference",
    components:{ MultiVideoConference, MonoVideoConference,ConferenceControle },
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
    dataChannel:undefined ,
   
    MAXIMUM_MESSAGE_SIZE: 65535,
    END_OF_FILE_MESSAGE:'EOF',
    downloadAnchor:undefined,
    receiveBuffer:[],              
    receivedSize:0,

    
  }),

  async mounted() {
    this.myVideo = document.getElementById("localVideo")
    this.downloadAnchor = document.getElementById('download');
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
         

          if(this.conference.admin&& this.dataChannel==undefined){
             // this.onSendFile(this.peers[user].pc)               
              // this.onSendFile(this.dataChannel) 
               
             const dataChannelNew =(pc)=>{
               return new Promise((resolve,reject)=>{
                   
                      const newDataChannel=pc.createDataChannel("chatFile")
                      newDataChannel.onopen=(event)=>{
                                try {
                                  if (event) {
                                    console.log("openeD")
                                    resolve(newDataChannel)
                                  }
                        
                                 } catch (error) {
                                   reject(error)
                                 }
                      } }).then((newDataChannel)=>{
                           console.log("newDataChannel for the se",newDataChannel)
                            
                            //newDataChannel.send("Hello from admin")
                            // newDataChannel.onmessage=function(event){
                            //   console.log("From other peer",event.data)
                            // }
                            newDataChannel.binaryType = 'arraybuffer';
                            this.setDataChannel(newDataChannel)

                      })
             }
             dataChannelNew(this.peers[user].pc)
                                
        }  


         if(!this.conference.admin){

            const dataChannel =(pc)=>{
               return new Promise((resolve,reject)=>{                   
                      pc.ondatachannel=(event)=>{
                      const channel =event.channel                    
                      channel.onopen=(event)=>{

                                try {
                                  if (event) {
                                    console.log("console--event in promise")
                                    resolve(channel)
                                  }
                        
                                 } catch (error) {
                                   reject(error)
                                 }
                           }
                      } }).then((channel)=>{

                             console.log("channel of recever",channel)
                            //.send("Hello from Israel")
                            // channel.onmessage=function(event){
                            //   console.log("From Heritier",event.data)
                            // }
                            //channel.binaryType = 'arraybuffer';
                            this.setDataChannel(channel)

                      })
             }


            dataChannel(this.peers[user].pc)

         }
         
				
		
        this.addLocalStream(this.peers[user].pc)        
         
        this.onAddStream(this.peers[user], user)
   
      // Act accordingly
      desc 
        ? this.handleAnswer(desc, this.peers[user].pc, user, this.conference.room, true)
        : this.createOffer(this.peers[user].pc, user, this.conference.room, true)

          
          //this.onTrack(this.peers[user])
    },
    displayType(type){
      this.typeOfDisplay=type
    },
    setDataChannel(channel){
     
      this.dataChannel=channel
       console.log(" Datachanel now dataChannel is ",this.dataChannel)
    },
    
    
    
    //for Heritier
    async shareScreenMethod(){
        
        this.shareScreen =!this.shareScreen

        await this.getUserDisplayMediaStream(this.shareScreen)

        for(const user in this.peers){ //user is all key from this.peers object           
            
           this.addLocalStream(this.peers[user].pc)

        }        
        
        this.$emit("shareScreenEvent",{usr:this.$store.state.username,shareSrn:this.shareScreen})

        console.log("Screen trigged")
    },


  },
  watch: {
    conference: function({ user, answer, candidate, userLeft, offer,shareSreenInfo,shareFileInfo }, oldVal) {
      if(userLeft && userLeft !== oldVal.userLeft) {
        this.peersLength--
        this.$emit("updatePeersLength",this.peersLength)
        this.peers[userLeft].pc.close()
        delete this.peers[userLeft]
      }
      // New user
      if(user && user !== oldVal.user) {
        
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
           console.log("==this.dataChannel==== when Receving=========",this.dataChannel)
            //this.onSendFile(this.dataChannel) 
            this.onReceveFile(this.dataChannel)
          //  this.dataChannel.send("Halla madrida From Isramen")
          //  this.dataChannel.onmessage=function(event){
          //    console.log("from Israel",event.data)
          //  }
           
                  
        
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

                    if(this.conference.admin){

                        
                          // for(const user in this.peers){ //user is all key from this.peers object           
                                console.log("The sender start to send his File")

                            //this.dataChannel= this.peers[user].pc.createDataChannel("chatFile")
                            console.log("==this.dataChannel==== when Sending=========",this.dataChannel)
                            this.onSendFile(this.dataChannel) 
                           // this.onReceveFile(this.dataChannel)
                            // console.log(" after initialisation now dataChannel is ",this.dataChannel)
                            // this.dataChannel.send("salut from admin")
                            // this.dataChannel.onmessage=function(event){
                            //     console.log("the data channel",event.data)

                             //}

                            this.$emit("signal-SharingFile")
                        
                                
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
    }
  }

}
</script>
<style>

</style>
