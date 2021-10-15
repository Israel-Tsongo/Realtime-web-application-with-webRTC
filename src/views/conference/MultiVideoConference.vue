<template>

<div style="height: auto;width: 100%;">
    <div class="row" id="Video-row" style="width: 52rem;">
        <div class="col">
            <div style="height: 600px;width: 53rem;display: flex;align-items: center;justify-content: center;background-color: white;border-radius: 30px;margin-right: 3rem;">
                <div id="video-space" style="height: auto;width: 100%;">

                    <div class="row" style="height: 290.25px;margin-right: 0px;margin-left: 0px; padding:0px,margin:0px">
                        <div class="col d-lg-flex justify-content-lg-center align-items-lg-center">
                            <div style="display: inline-block;border-radius: 20px;position: relative;width:auto; height:auto">
                                 
                                 <!--- ## Local Video ## -->

                                  <Video 
                                    videoId="localVideo" 
                                    :pauseAudio="localPauseAudio" 
                                    :pauseVideo="localPauseVideo"
                                    :videoStream="localVideoStream"
                                    :muted="true"
                                    :displayControls="false">                                  
                                  </Video>

                                  <!--- ## End Local Video ## -->
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 25px;border-radius: 5px 5px 5px 5px;color: white;">Israel&nbsp;</span>
                            </div>
                        </div>
                        <div class="col d-lg-flex align-items-lg-center">
                                <!--- ## first Remote Video ## -->
                            <div   style="display: inline-block;height:auto;width:auto;position: relative;">
                                 <!--- ##  ## -->
                                 
                                <!-- <img class="img-fluid" src="assets/img/young-college-students.jpg" style="border-radius: 20px;width: 400px;height:250px"> -->
                                 <!--- ##  ## -->
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 25px;border-radius: 5px 5px 5px 5px;color: white;">Israel Tsongo&nbsp;</span>
                            </div>
                                 <!--- ## End first Remote Video ## -->

                        </div>
                    </div>

                   
                    
                    <div  v-for="(item, key) in peers" :key="key"  class="row" style="height: 290px;margin-right: 0px;margin-left: 0px;">
                        <div class="col d-lg-flex justify-content-lg-center align-items-lg-center">
                            <div style="display: inline-block;border-radius: 20px;position: relative;width:auto; height:auto">
                                
                                <Video 
                                    :videoId="key" 
                                    :displayControls="false"                                   
                                    :videoStream="peers[key].peerStream"
                                    :muted="false">
                                                                     
                                </Video>
                                
                                
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 25px;border-radius: 5px 5px 5px 5px;color: white;">Israel&nbsp;</span>
                            </div>
                        </div>
                        <!--
                        <div class="col d-lg-flex align-items-lg-center">
                            <div style="display: inline-block;height:auto;width:auto;position: relative;">
                                <img class="img-fluid" src="assets/img/young-college-students.jpg" style="border-radius: 20px;width: 400px;height:250px">
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 25px;border-radius: 5px 5px 5px 5px;color: white;">Israel Tsongo&nbsp;</span>
                            </div>
                        </div>-->

                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>

    
</template>
<script>
import Video from '../../components/video/Video.vue'
export default {
  components: { Video },
    name:"MultiVideoConference",
    props:{
        peersLength:Number,
        users:Array,
        conference:Object,

        //Local data

        localVideoStream:MediaStream,       
        localPauseVideo:Function,
        localPauseAudio:Function,
        localMuted:Boolean,
       
        peers:Object,
               
        
    },
   

    

}
</script>
<style  lang="scss" scoped >

</style>