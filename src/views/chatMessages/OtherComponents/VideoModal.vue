

<template>

    <div id="content-div">                                          
                                                    
        <div id="main-div">
            <span id="videoSpan"> 

            <!-- Video -->
                    <div class="video" style="border-radius:30px">
                        <div class="video__spinner">
                        <md-progress-spinner 
                            v-if="!remoteStream" 
                            class="md-accent" 
                            md-mode="indeterminate">
                        </md-progress-spinner>
                        </div>

                        <!-- Audio video controls -->
                        <video  
                            id="Remote-video"      
                            autoplay="true"
                            muted="muted"
                            v-if="muted">
                        </video>
                        <video  
                            id="Remote-video" 
                            autoplay="true"
                            v-if="!muted">
                        </video>
                    </div>
            <!-- End -->  

            </span>
            <div id="local-video-div">
                <div id="localVideo-mainDiv">
                    <span id="localVideoSpan">
                        <video id="Local-video" autoplay="true" muted="muted" style="width:inherit;height:inherit"></video>
                    </span>
                    <span class="text-center" id="localVideo-muteSpan">
                        <i class="material-icons" id="localVideoMuted-Icon">mic_off</i>
                    </span>
                </div>
            </div>
            <div id="localVideo-VolumeDiv">
                <input type="range" id="localVideo-volumeRange">
                <div id="localVideo-volumeIconDiv" class="input-field">
                    <span class="d-flex justify-content-center align-items-center">
                        <i class="fa fa-volume-up rounded-circle" id="localVolumeIcon"></i>
                    </span>
                </div>
            </div>
            <AudioVideoControls 
                v-if="displayControls" 
                :pauseVideo="pauseVideo()" 
                :pauseAudio="pauseAudio()">
            </AudioVideoControls>
        </div>                                       

    </div> 

 
</template>

<script>

import { WS_EVENTS } from './../../../utils/config'
import { videoConfiguration } from './../../../mixins/WebRTC'
import AudioVideoControls from  './AudioVideoControls'


   export default {
 
   name:"VideoModal",    
  
    props: {
        
        room: String,
        to: String,
        videoAnswer: Object,
        muted:Boolean
    },
    mixins:[videoConfiguration],
    components:{AudioVideoControls},
    data: () => ({
        // Media config
        constraints: {
            video: {
                width: 450,
                height: 348
            }
        },
        // Peer connection
        pc: undefined,
        remoteStream: undefined,
        remoteVideo: {},
        displayControls:false
    }),
    async created() {
        console.log("created videoAnswer",this.videoAnswer)
        console.log("created videoAnswer video",this.videoAnswer.video)

        // Get user media
        await this.getUserMedia()
        await this.getAudioVideo()
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
        this.myVideo = document.getElementById("Local-video")
        this.remoteVideo = document.getElementById("Remote-video")
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
        createPeerConnection() {
        this.pc = new RTCPeerConnection(this.configuration)
        },
        onAddStream() {
        this.pc.onaddstream = event => {

            
            console.log("on addStream info srcObj",this.remoteVideo.srcObject)
            if (!(this.remoteVideo.srcObject && event.stream)) {
            this.remoteStream = event.stream
            this.remoteVideo.srcObject = this.remoteStream
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
.video {
  background-color: #353535;
  height: 100%;
  position: relative;
  &__spinner {
    position: absolute;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  video {
    width: 100%;
    height: 100%;
  }
}
</style>