<template>
<div v-if="typeOfDisplay=='MultiVideoConference' && conference.open"   style="height: 5rem;display: flex;justify-content: center;">
    <div class="d-lg-flex align-items-lg-center" style="width: auto;height: 100%;/*margin-top: 40px;*/">
        <button @click="swapVideo()" class="btn btn-primary btn-control" type="button">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-camera-video" style="font-size: 20px;">
                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"></path>
                </svg>
            </span>
        </button>
        <button @click="shareScreen()"  class="btn btn-primary btn-control" type="button">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-screen-share" style="font-size: 21px;">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9"></path>
                    <line x1="7" y1="20" x2="17" y2="20"></line>
                    <line x1="9" y1="16" x2="9" y2="20"></line>
                    <line x1="15" y1="16" x2="15" y2="20"></line>
                    <path d="M17 4h4v4"></path>
                    <path d="M16 9l5-5"></path>
                </svg>
            </span>
        </button>
        <button @click="endCall()" class="btn btn-danger btn-control" type="button" style="width: 61.1333px;height: 53.0667px;border-radius: 15px;">
            <span><i class="material-icons" style="font-size: 26px;">call_end</i></span>
        </button>
        <button @click="swapAudio()" class="btn btn-primary btn-control" type="button">
            <span><i class="fa fa-microphone" style="font-size: 25px;"></i></span>
        </button>
        <button class="btn btn-primary btn-control" type="button">
            <span style="height: 55px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                </svg>
            </span>
        </button>
    </div>
</div>

    
</template>
<script>
export default {
    name:"BtnConferenceControle",
    props:{
        typeOfDisplay:String, 
        conference:Object,
        localPauseVideo:Function,
        localPauseAudio:Function,

    },data: () => ({
        videoOn: true,
        audioOn: true
  }),
    
    methods:{
        swapVideo() {
            this.videoOn = !this.videoOn
            this.localPauseVideo()
        },
        swapAudio() {
            this.audioOn = !this.audioOn
            this.localPauseAudio()
        },
        shareScreen(){
            this.$emit("shareScreen")
        },
         endCall(){
            this.$emit("endCall")
        }

    }
   
}
</script>
<style>

</style>