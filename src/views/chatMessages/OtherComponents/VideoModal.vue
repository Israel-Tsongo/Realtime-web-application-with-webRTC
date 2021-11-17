

<template>

    <div id="content-div">                                          
                                                    
        <div id="main-div">
            <span id="videoSpan" style="width:580px"> 

            <!-- Video -->
                    <div class="video" style="border-radius:30px;width:580px">
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
            <!--Controle -->
            <div style="position: absolute;height: 5rem;display: flex;justify-content: center;margin-top: 20px;bottom: 6%;right: 25%;">
                <div class="d-lg-flex align-items-lg-center" style="width: auto;height: 100%;/*margin-top: 40px;*/">
                    <button @click="swapVideo()" class="btn btn-light btn-control rounded-circle" type="button" style="margin-right: 1rem;height: 50px;">
                        <span style="display: inline-block;width: 35px;height: 27px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-camera-video-fill" style="font-size: 20px;">
                                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"></path>
                            </svg>
                        </span>
                    </button>
                    <button @click="shareScreenMethod()" class="btn btn-light btn-control rounded-circle" type="button" style="margin-right: 1rem;height: 50px;">
                            <span style="display: inline-block;width: 38px;height: 30px;padding-top: 8px;">
                                <i class="material-icons" style="font-size: 21px;">screen_share</i></span>
                    </button>
                    <button @click="endPrivateCall()" class="btn btn-danger btn-control" type="button" style="width: 61.1333px;height: 53.0667px;border-radius: 15px;">
                        <span><i class="material-icons" style="font-size: 26px;">call_end</i></span>
                    </button>
                    <button @click="swapAudio()" class="btn btn-light btn-control rounded-circle" type="button" style="margin-left: 1rem;height: 50px;">
                        <span style="display: inline-block;width: 35px;height: 27px;">
                            <i class="fa fa-microphone" style="font-size: 25px;"></i>
                        </span>
                    </button>
                    <button  class="btn btn-light btn-control rounded-circle" type="button" style="margin-left: 1rem;height: 50px;">
                        <span style="height: 37px;width: 28px;display: inline-block;padding-top: 4px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                                <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                            </svg>
                        </span>
                    </button>
                    </div>
                </div>
           </div>  
                                         

    </div> 

 
</template>

<script>

import { WS_EVENTS } from './../../../utils/config'
import { videoConfiguration } from './../../../mixins/WebRTC'
//import AudioVideoControls from  './AudioVideoControls'


   export default {
 
   name:"VideoModal",    
  
    props: {
        
        room: String,
        to: String,
        videoAnswer: Object,
        muted:Boolean,
        allPrivateChatInfo:Object
    },
    mixins:[videoConfiguration],
    
    data: () => ({

        videoOn: true,
        audioOn: true,
        shareScreen:false,

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
        //await this.getAudioVideo()
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
        swapVideo() {
            this.videoOn = !this.videoOn
            this.pauseVideo()
        },
        swapAudio() {
            this.audioOn = !this.audioOn
            this.pauseAudio()
        },
        endPrivateCall(){

                this.pc.close()
                this.pc = null
                this.$socket.emit(WS_EVENTS.privateMessagePCSignaling, {  
                    to: this.to,
                    from: this.$store.state.username,
                    room: this.room
                })
                this.localStream=undefined
                this.$emit("endPrivateCall")
        },

        async shareScreenMethod(){        
                
                    
                    if(this.localStream!==undefined){

                        this.isVideoStarted=true 
                    }

                    this.shareScreen =!this.shareScreen

                    await this.getUserDisplayMediaStream(this.shareScreen)                            
                        
                    this.addLocalStream(this.pc)                        
                    
                    this.$emit("sharePrivateScreen",{userFrom:this.$store.state.username,shareSrn:this.shareScreen})

                    console.log("Private Screen trigged")
               
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
        },
        allPrivateChatInfo:function({shareSreenInfo},oldVal){

            if(shareSreenInfo.shareScreen && (shareSreenInfo !== oldVal.shareSreenInfo) && (shareSreenInfo.userFrom !== this.$store.state.username)) {
        
            this.onAddStream()  
            console.log("screensharing")       
        
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