<template>
  <div class="video">
    <div class="video__spinner">
    
      <md-progress-spinner 
        v-if="!videoStream" 
        class="md-accent" 
        md-mode="indeterminate">
      </md-progress-spinner>
     </div>

    <video v-bind:class="[isFullScreen?'videoOnFullScreen':'videos']"
        :id="videoId"      
        autoplay="true"        
        muted="muted"        
        v-if="muted">
         
    </video>

    <video  
        v-bind:class="[isFullScreen?'videoOnFullScreen':'videos']"
        :id="videoId" 
        autoplay="true"        
        v-if="!muted">
    </video>
   
  </div>
</template>

<script>
//import AudioVideoControls from "./AudioVideoControls"

export default {
  name: "Video",
  components: {
   // AudioVideoControls
  },
  props: {
      videoId: String,
      displayControls: Boolean,
      videoStream: MediaStream,
      isFullScreen:Boolean,
      // pauseVideo: Function,
      // pauseAudio: Function,
      muted: Boolean
  }
}
</script>

<style lang="scss" scoped>
.video {
  background-color: rgb(56, 56, 55);
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 25px;
  
  &__spinner {
    position: absolute;
    width: 100%;
    display: flex;
    height: 223px;    
    align-items: center;
    justify-content: center;
  }
  
}

.videos {
    
    width: 100%;   
    height: 223px;        
    border-radius: 25px;
    

    
  }
.videoOnFullScreen{

    width: 100%;   
    height: 100%;        
    border-radius: 25px;
  }
</style>