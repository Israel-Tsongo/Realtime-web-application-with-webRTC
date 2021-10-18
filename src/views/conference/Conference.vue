<template>

        <div style="width:auto;height:auto">
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
                :peers="peers" >              
               
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
    
    

  },
  mixins:[videoConfiguration],
  
  data: () => ({
    peers: {},
    peersLength: 0
  }),

  async mounted() {
    this.myVideo = document.getElementById("localVideo")
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
      // Add user
      this.$set(this.peers, user, {
        username: user,
        pc: new RTCPeerConnection(this.configuration),
        peerStream: undefined,
        peerVideo: undefined
      })
      this.addLocalStream(this.peers[user].pc)
      this.onIceCandidates(this.peers[user].pc, user, this.conference.room, true)
      this.onAddStream(this.peers[user], user)

      // Act accordingly
      desc 
        ? this.handleAnswer(desc, this.peers[user].pc, user, this.conference.room, true)
        : this.createOffer(this.peers[user].pc, user, this.conference.room, true)
    },
    displayType(type){
      this.typeOfDisplay=type
    },


  },
  watch: {
    conference: function({ user, answer, candidate, userLeft, offer }, oldVal) {
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
      // Handle answer
      if(answer && oldVal.answer !== answer) 
        this.setRemoteDescription(answer.desc, this.peers[answer.from].pc)
      // Add candidate
      if (candidate && oldVal.candidate !== candidate) 
        this.addCandidate(this.peers[candidate.from].pc, candidate.candidate)
      // New offer
      if(offer && offer !== oldVal.offer && oldVal.offer !== undefined){
        const { from, desc } = offer
        this.init(from, desc)
      }

    }

  }


}
</script>
<style>

</style>