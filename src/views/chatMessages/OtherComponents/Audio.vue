<template>
  <div id="audio-modal-main">

            <div id="audio-model-title">
                <span id="audio-modal-span">
                    <i class="icon ion-android-call" id="audio-modal-icon-call"></i>&nbsp; Appel Audio</span>
            </div>
            <div id="audio-main-Icon">
                <span class="d-xl-flex justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-iconSpan">
                    <span class="d-lg-flex d-xl-flex justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-second-iconSpan">
                        <i class="fa fa-user" id="audio-main-icon"></i>
                    </span>
                </span></div>
            <div style="height: 6rem;display: flex;justify-content: center;">
                <div style="width: 6rem;height: inherit;color: white;">
                    <span class="text-center" style="display: block;font-weight: 502;">Appel audio&nbsp;</span>
                    <span class="d-xl-flex justify-content-xl-center">Avec</span>
                    <span class="text-center d-xl-flex justify-content-xl-center" style="display: block;font-size: 25px;font-weight: 700;">Gerkis</span>
                </div>
            </div>
            <div id="audio-modal-spaceDiv">             
                <audio id="remoteAudio"> </audio>
                <audio v-show="false" id="localAudio"> </audio>            
            </div>
            <div id="audio-control-dv">
                <div class="d-xl-flex justify-content-xl-center" id="audio-control-div-icon">
                    <button class="btn btn-primary rounded-circle" id="audio-control-mic-btn" type="button" style="height: 3rem;width: 3rem;">
                        <i class="fas fa-microphone-alt-slash"></i>
                    </button>        
                    <button class="btn btn-danger rounded-circle" id="audio-control-endCall-btn" type="button">
                        <i class="material-icons">call_end</i>
                    </button><button class="btn btn-primary rounded-circle" id="audio-control-volume-btn" type="button">
                        <i class="fa fa-volume-up"></i>
                    </button>
                </div>
            </div>
        </div>
</template>

<script>

import { log } from "../../../utils/logging"
import { WS_EVENTS } from '../../../utils/config'
import { videoConfiguration } from '../../../mixins/WebRTC'


export default {
  name: "Audio",
  
  props: {

        room: String,
        to: String,
        videoAnswer: Object      
  },
  data(){
      return {
          myAudio:undefined,
          remoteAudio:undefined
      }
  },
  mixins:[videoConfiguration],  

  async created() {
        console.log("created videoAnswer",this.videoAnswer)
        console.log("created videoAnswer video",this.videoAnswer.video)

        // Get user media
        await this.getUserAudioMedia()
        await this.getAudio()
        // Create peer connection and add local stream
        this.createPeerConnection()
        this.addLocalStream(this.pc)
        // Event listeners
        this.onIceCandidates(this.pc, this.to, this.room)
        this.onAddStream()
        // Handlers
        !this.videoAnswer.video
        ? this.createOffer(this.pc, this.to, this.room) // Caller
        : this.handleAnswer(this.videoAnswer.remoteDesc, this.pc, this.videoAnswer.from, this.room) // Callee
    },
    mounted() {
        this.myAudio = document.getElementById("localAudio")
        this.remoteAudio = document.getElementById("remoteAudio")
    },
    beforeDestroy() {
        this.pc.close()
        this.pc = null
        this.$socket.emit(WS_EVENTS.privateMessagePCSignaling, {  
        to: this.to,
        from: this.$store.state.username,
        room: this.room
        })
    },
    methods: {
        async getUserAudioMedia() {
            log(`Requesting ${this.username} video stream`)

            if ("mediaDevices" in navigator) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({...this.constraints,video:false})                   
                    
                    this.localStream = stream
                } catch (error) {
                    log(`getUserMedia error: ${error}`)
                }
            }
        },
        async getAudio() {           
            const audio = this.localStream.getAudioTracks()            
            if (audio.length > 0) log(`Using audio device: ${audio[0].label}`)
        },


        createPeerConnection() {
        this.pc = new RTCPeerConnection(this.configuration)
        },
        onAddStream() {
        this.pc.onaddstream = event => {

            
            //console.log("on addStream info srcObj",this.remoteVideo.srcObject)
            if (!(this.remoteAudio.srcObject && event.stream)) {
            this.remoteStream = event.stream
            this.remoteAudio.srcObject = this.remoteStream
            }
        }
        },
    },
    watch: {
        videoAnswer: function(newVal, oldVal) {
        const desc = newVal.remoteDesc
        const candidate = newVal.candidate
        if (!!desc && desc !== oldVal.remoteDesc) {
            this.setRemoteDescription(desc, this.pc)
        }
        if (!!candidate && candidate !== oldVal.candidate) {
            this.addCandidate(this.pc, candidate)
        }
        }
    }
}
</script>

<style lang="scss" scoped>


</style>