<template>

<div style="height: 480px;width: 100%;">
    <div class="row" id="Video-row" style="width:100%;height:485px">
        <div class="col">
            <div style="height:475px; width:810px;background-color: white;border-radius: 30px;display:flex">

                <div   id="video-space" style="height:475px;width: 100%;align-items:center;" v-bind:class="[peerKeys.length==1?'videoSpace':'']">
                    <div class="row" style="width:100% ;margin-right: 0px;margin-left: 0px; padding:0px,margin:0px;margin-top:5px">
                        <div class="col" style="height:223px;width:48%">
                             
                            <div id="containsVideo" style="border-radius: 20px;position: relative;width:100%; height:100%">
                                 
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
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{$store.state.username}}</span>
                            </div>
                        </div>

                        

                        <div  v-if="peerKeys[0]" class="col d-lg-flex align-items-lg-center" style="height:223px;width:48%">
                                <!--- ## first Remote Video ## -->
                            <div   style="border-radius: 20px; display:inline-block; height:100%; width:100%; position: relative;">
                                    <!--- ##  ## -->
                                    
                                        <Video 
                                            :videoId="peerKeys[0]" 
                                            :displayControls="false"                                   
                                            :videoStream="peers[peerKeys[0]].peerStream"
                                            :muted="false">                                                                     
                                         </Video>  
                                    <!--- ##  ## -->
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[0]}}</span>
                            </div>
                                 <!--- ## End first Remote Video ## -->

                        </div>
                    </div>

                   
                    
                    <div v-if="peerKeys.lenght > 1" class="row" style="width:100%; margin-top:5px; margin-right:0px; margin-left: 0px; padding:0px,margin:0px">
                        <div class="col" style="height:223px;width:48%">
                            <div style="border-radius: 20px; display: inline-block;border-radius: 20px;position: relative;width:100%; height:100%">
                                
                                <Video 
                                    v-if="peerKeys[1]"
                                    :videoId="peerKeys[1]" 
                                    :displayControls="false"                                   
                                    :videoStream="peers[peerKeys[1]].peerStream"
                                    :muted="false">                                                                     
                                </Video>
                                
                                
                                <span style="position: absolute;left: 2rem;top: 3rem;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[1]}}</span>
                            </div>
                        </div>
                        
                        <div v-if="peerKeys[2]" class="col d-lg-flex align-items-lg-center" style="border:3px solid yellow; height:223px;width:48%">
                            <div style="border-radius: 20px;display: inline-block; height:100%; width:100%; position:relative;">
                                           
                                        <Video 
                                            v-if="peerKeys[2]"
                                            :videoId="peerKeys[2]" 
                                            :displayControls="false"                                   
                                            :videoStream="peers[peerKeys[2]].peerStream"
                                            :muted="false">                                                                     
                                        </Video>

                                <span style="position: absolute;left: 5%;top: 1%">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-speaker" style="font-size: 32px;color: #ffffff;">
                                        <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"></path>
                                        <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[2]}}</span>
                            </div>
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
    components:{
         Video
    },
    
    computed:{

        peerKeys:function(){


            return Object.keys(this.peers)
        }

    }
   

    

}
</script>
<style  lang="scss" scoped >


.videoSpace{

        display:flex;
        align-items:center;
        justify-content:center;

}


</style>