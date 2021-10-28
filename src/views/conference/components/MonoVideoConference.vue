<template>

<div style="height: auto;width: 100%;">
    <div class="row" id="Video-row" style="width: 52rem;">
        <div class="col">
            <div style="height: 590px;width: 55rem;display: flex;align-items: center;justify-content: center;background-color: white;border-radius: 30px;margin-right: 3rem;">
                <div style="height: 530px;width: 51rem;position: relative;z-index: 1;">
                    <span v-for="(item, key) in peers" :key="key" style="display: inline-block;height: 420px;width: 800px;">

                                <Video 
                                    :videoId="key" 
                                    :displayControls="false"                                   
                                    :videoStream="peers[key].peerStream"
                                    :muted="false">                                                                     
                                </Video>
                                {{peers}}
                           
                        <!--<img class="img-fluid" src="assets/img/young-college-students.jpg" style="border-radius: 20px;height: inherit;width: inherit;">-->
                    </span>
                    <div style="display: inline-block;position: absolute;z-index: 10;height: auto;width: 103px;right: 3%;top: 8%;">
                        <div  style="display: flex;justify-content: center;align-items: center;height: 106px;width: 107px;background: white;border-radius: 20px;">
                            <span style="display: inline-block;height: 100px;width: 100px;position: relative;">
                                                               
                                 <Video 
                                    videoId="localVideo" 
                                    :pauseAudio="localPauseAudio" 
                                    :pauseVideo="localPauseVideo"
                                    :videoStream="localVideoStream"
                                    :muted="true"
                                    :displayControls="false">                                  
                            </Video>
                            </span>
                            <span class="text-center" style="display: inline-block;position: absolute;bottom: 8%;right: 2%;background: rgb(84,150,84);border-radius: 10px;width: 28px;height: 30px;padding: 5px 2px;">
                                <i class="material-icons" style="color: white;">mic_off</i>
                            </span>
                        </div>
                    </div>
                    <!--Volume -->
                    <div style="height: 220px;width: 50px;align-items: flex-end;position: absolute;background: rgba(255,255,255,0.49);border-radius: 30px;bottom: 25%;left: 4%;">
                        <input type="range" style="position: relative;width: 153px;height: 65px;bottom: -26%;left: -105%;transform: rotateZ(-90deg);">
                        <div class="input-field" style="height: auto;position: absolute;bottom: 3%;left: 3%;">
                            <span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;">
                                <i class="fa fa-volume-up rounded-circle" style="background: #f8fafd;color: rgb(0,0,0);opacity: 0.72;"></i>
                            </span>
                        </div>
                    </div>
                    <!--Controle -->
                    <div style="position: absolute;height: 5rem;display: flex;justify-content: center;margin-top: 20px;bottom: 20%;right: 30%;">
                        <div class="d-lg-flex align-items-lg-center" style="width: auto;height: 100%;/*margin-top: 40px;*/">
                            <button class="btn btn-light btn-control rounded-circle" type="button" style="margin-right: 1rem;height: 50px;">
                                <span style="display: inline-block;width: 35px;height: 27px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-camera-video-fill" style="font-size: 20px;">
                                            <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"></path>
                                    </svg>
                                </span>
                            </button>
                            <button @click="shareScreen()" class="btn btn-light btn-control rounded-circle" type="button" style="margin-right: 1rem;height: 50px;">
                                    <span style="display: inline-block;width: 38px;height: 30px;padding-top: 8px;">
                                        <i class="material-icons" style="font-size: 21px;">screen_share</i></span>
                            </button>
                            <button class="btn btn-danger btn-control" type="button" style="width: 61.1333px;height: 53.0667px;border-radius: 15px;">
                                <span><i class="material-icons" style="font-size: 26px;">call_end</i></span>
                            </button>
                            <button class="btn btn-light btn-control rounded-circle" type="button" style="margin-left: 1rem;height: 50px;">
                                <span style="display: inline-block;width: 35px;height: 27px;">
                                    <i class="fa fa-microphone" style="font-size: 25px;"></i>
                                </span>
                            </button>
                            <button class="btn btn-light btn-control rounded-circle" type="button" style="margin-left: 1rem;height: 50px;">
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
        </div>
    </div>
</div>
                      
    
</template>
<script>
import Video from '../../../components/video/Video.vue'
export default {
    name:"MonoVideoConference",
    components: { Video },
    props:{
        peersLength:Number,
        users:Array,
        conference:Object,

        //Local data
        localVideoStream:MediaStream,       
        localPauseVideo:Function,
        localPauseAudio:Function,               
        peers:Object,
               
        
    },
    mounted(){
        console.log("Peers are",this.peers)
    },
    methods:{

        shareScreen(){
            this.$emit("shareScreen")
            console.log("Screen trigged 1")
        }

    }
   
    
}
</script>
<style>

</style>