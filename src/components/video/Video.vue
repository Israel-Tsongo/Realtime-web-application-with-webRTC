<template>
  <div class="video">
    <div class="video__spinner">
      <md-progress-spinner 
        v-if="!videoStream" 
        class="md-accent" 
        md-mode="indeterminate">
      </md-progress-spinner>
     </div>

    <video  
        :id="videoId"      
        autoplay="true"        
        muted="muted"        
        v-if="muted">
    </video>
    <video  
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
      // pauseVideo: Function,
      // pauseAudio: Function,
      muted: Boolean
  }
}
</script>

<style lang="scss" scoped>
.video {
  background-color: rgb(56, 56, 55);
  height: inherit;
  width: inherit;
  position: relative;
  border-radius: 25px;
  
  &__spinner {
    position: absolute;
    width: inherit;
    display: flex;
    height: 223px;    
    align-items: center;
    justify-content: center;
  }
  video {
    
    width: 100%;   
    height: 100%;
    border-radius: 25px;
    

    
  }
}
</style>