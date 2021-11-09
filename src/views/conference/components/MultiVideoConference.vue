<template>

<div style="height: 480px;width: 100%;">
    <div class="row" id="Video-row" style="width:100%;height:485px">
        <div class="col">
            <div style="height:475px; width:810px;background-color: white;border-radius: 30px;display:flex">
                   
                <div   id="video-space" style="max-height:475px;width: 100%;align-items:center;" v-bind:class="[peerKeys.length==1?'videoSpace':'']">
                    <div class="row" style="width:100% ;margin-right: 0px;margin-left: 0px; padding:0px,margin:0px;margin-top:5px">
                        
                        
                        <div class="col" style="height:223px;width:48%">
                                    
                                     <fullscreen :fullscreen.sync="localFullscreen">
                                        <div id="containsVideo" style="border-radius: 20px;position: relative;width:100%; height:223px">
                                            
                                            <!--- ## Local Video ## -->

                                            <Video 
                                                videoId="localVideo"                                                
                                                :videoStream="localVideoStream"
                                                :muted="true"
                                                :displayControls="false">                                  
                                            </Video> 

                                            <!--- ## End Local Video ## -->
                                            <span  style="position: absolute;left: 1rem;top: 1rem;color:white">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                                                </svg>
                                            </span>
                                            <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{$store.state.username}}</span>
                                        </div>                                    
                                 </fullscreen>                                    
                                
                        </div>

                        
                        <div  v-if="peerKeys[0]" class="col d-lg-flex align-items-lg-center" style="height:223px;width:48%">
                                <!--- ## first Remote Video ## -->
                            <fullscreen :fullscreen.sync="RemoteFullscreen1">
                                    <div  style="border-radius: 20px; display:inline-block; height:223px; width:100%; position: relative;">
                                        <!--- ##  ## -->
                                        
                                            <Video 
                                                :videoId="peerKeys[0]" 
                                                :displayControls="false"                                   
                                                :videoStream="peers[peerKeys[0]].peerStream"
                                                :muted="false">                                                                     
                                            </Video>  
                                        <!--- ##  ## -->
                                    <span @click="toggleRemoteScreen1()"  style="position: absolute;left: 1rem;top: 1rem;color:white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                                            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                                        </svg>
                                    </span>
                                    <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[0]}}</span>
                                </div>
                                   <!--- ## End first Remote Video ## -->
                                </fullscreen>
                        </div>
                        
                    </div>

                   
                    
                    <div v-if="peerKeys.length > 1" class="row" style="width:100%; margin-top:5px; margin-right:0px; margin-left: 0px; padding:0px,margin:0px">
                        <div class="col" style="max-height:223px;max-width:48%">
                          <fullscreen :fullscreen.sync="RemoteFullscreen2">
                            <div style="border-radius: 20px; display: inline-block;border-radius: 20px;position: relative;width:100%; max-height:223px">
                                
                                <Video 
                                    v-if="peerKeys[1]"
                                    :videoId="peerKeys[1]" 
                                    :displayControls="false"                                   
                                    :videoStream="peers[peerKeys[1]].peerStream"
                                    :muted="false">                                                                     
                                </Video>
                                
                                
                                <span  @click="toggleRemoteScreen2()" style="position: absolute;left: 1rem;top: 1rem; color:white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                                        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[1]}}</span>
                            </div>
                            </fullscreen>
                        </div>
                        
                        <div v-if="peerKeys[2]" class="col d-lg-flex align-items-lg-center" style="border:3px solid yellow; max-height:223px;width:48%">
                             <fullscreen :fullscreen.sync="RemoteFullscreen3">
                            <div style="border-radius: 20px;display: inline-block; max-height:223px; width:100%; position:relative;">
                                           
                                        <Video 
                                            v-if="peerKeys[2]"
                                            :videoId="peerKeys[2]" 
                                            :displayControls="false"                                   
                                            :videoStream="peers[peerKeys[2]].peerStream"
                                            :muted="false">                                                                     
                                        </Video>

                                <span @click="toggleRemoteScreen3()" style="position: absolute;left: 1rem;top: 1rem;color:white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" style="font-size: 27px;">
                                        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                                    </svg>
                                </span>
                                <span style="position: absolute;bottom: 4%;left: 2%;background-color: rgba(51,51,51,0.48);font-size: 15px;border-radius: 5px 5px 5px 5px;color: white;">{{peerKeys[2]}}</span>
                            </div>
                             </fullscreen>
                        </div>

                    </div>

                   
                </div>
            </div>
        </div>
    </div>
    <div style="width:100%;height:100%" class="fullscreen-wrapper">
      
    </div>
</div>

    
</template>
<script>
import VueFullscreen from 'vue-fullscreen'
  import Vue from 'vue'
  Vue.use(VueFullscreen)

import Video from '../../../components/video/Video.vue'
export default {
  
    name:"MultiVideoConference",
    components: {
      Video,
      
    },
    data() {
      return {
              
        teleport: true,
        pageOnly: false,
        localFullscreen:false,
        RemoteFullscreen1:false,
        RemoteFullscreen2:false,
        RemoteFullscreen3:false
      }
    },
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
               
        
    },methods:{

        toggleRemoteScreen1 () {
        this.RemoteFullscreen1 = !this.RemoteFullscreen1
      },
      toggleRemoteScreen2 () {
        this.RemoteFullscreen2 = !this.RemoteFullscreen2
      },
      toggleRemoteScreen3 () {
        this.RemoteFullscreen3 = !this.RemoteFullscreen3
      },

      toggleApi () {
        this.$fullscreen.toggle(this.$el.querySelector('.fullscreen-wrapper'), {
          teleport: this.teleport,
          callback: (isFullscreen) => {
            this.RemoteFullscreen1= isFullscreen
          },
        })
      },


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