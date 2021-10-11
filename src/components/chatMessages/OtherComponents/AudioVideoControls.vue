<template>


<div id="localvideoControl-div" style="position: absolute;height: 5rem;display: flex;justify-content: center;margin-top: 20px;bottom: -2%;right: 30%;">
    <div class="d-lg-flex align-items-lg-center" id="localvideoControl-main">
        <button @click="swapVideo()" class="btn btn-light btn-control rounded-circle control-btn" type="button">
            <span id="camera-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-camera-video-fill" id="cameraIcon">
                    <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"></path>
                </svg>
            </span>
        </button>
        <button class="btn btn-light control-btn btn-control rounded-circle" id="share-btn" type="button">
            <span id="share-span">
                <i class="material-icons" style="font-size: 21px;">screen_share</i>
            </span>
        </button>
        <button class="btn btn-danger control-btn btn-control" id="endCall-btn" type="button">
            <span>
                <i class="material-icons" id="end-call-icon">call_end</i>
            </span>
        </button>
        <button @click="swapAudio()" class="btn btn-light btn-control rounded-circle" id="mic-btn" type="button"><span id="mic-span"><i class="fa fa-microphone" id="mic-icon"></i></span></button><button class="btn btn-light btn-control rounded-circle" id="fullScreen-btn" type="button">
            <span id="fullscreen-span">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" id="fullscreen-icon" style="font-size: 27px;">
                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"></path>
                </svg>
            </span>
        </button>
                
    </div>
  </div>


 <!-- <div class="controls">
    <span
      @click="swapVideo()"
      class="material-icons"
      :class="{ disabled: !videoOn }"
    >{{ videoOn ? 'videocam' : 'videocam_off'}}</span>
    <span
      @click="swapAudio()"
      class="material-icons"
      :class="{ disabled: !audioOn }"
    >{{ audioOn ? 'mic' : 'mic_off'}}</span>
  </div> -->

</template>

<script>
export default {
  name: "AudioVideoControls",
  props: {
    pauseVideo: Function,
    pauseAudio: Function
  },
  data: () => ({
    videoOn: true,
    audioOn: true
  }),
  methods: {
    swapVideo() {
      this.videoOn = !this.videoOn
      this.pauseVideo()
    },
    swapAudio() {
      this.audioOn = !this.audioOn
      this.pauseAudio()
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: center;
  span {
    &:hover {
      background: #717171;
    }
    border: solid 1px white;
    border-radius: 17px;
    padding: 4px;
    z-index: 2;
    bottom: 0;
    display: block;
    color: white;
    margin: 0 5px 5px 5px;
    cursor: pointer;

    &.disabled {
      background-color: red;
      border: solid 1px red;
      &:hover {
        background-color: red;
      }
    }
  }
}
</style>