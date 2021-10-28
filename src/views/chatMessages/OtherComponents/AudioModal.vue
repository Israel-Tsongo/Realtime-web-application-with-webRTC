
<template>
 <!--###### Audio Modal ########-->
                    
                    <div class="modal fade show" id="audioAppelModal"  role="dialog" tabindex="-1" >
                        <div class="modal-dialog" role="document" style="max-width: 30rem;max-height: 50rem;">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Appel Audio</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                </div> 

                                    <!--####  Audio modal  body  ####-->

                                    <div class="modal-body" id="modal-audio">                                        
                                    
                                           <div id="audio-modal-main">
                                                <div id="audio-model-title">
                                                    <span id="audio-modal-span">
                                                        <i class="icon ion-android-call" id="audio-modal-icon-call"></i>&nbsp; Appel Audio</span>
                                                </div>
                                                <div id="audio-main-Icon">
                                                    <span class="d-xl-flex justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-iconSpan">
                                                        <span class="d-lg-flex d-xl-flex justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center rounded-circle" id="audio-main-second-iconSpan">
                                                            <i class="fa fa-user" id="audio-main-icon"></i>
                                                        </span>
                                                    </span></div>
                                                <div style="height: 6rem;display: flex;justify-content: center;">
                                                    <div style="width: 6rem;height: inherit;color: white;">
                                                        <span class="text-center" style="display: block;font-weight: 502;">Appel audio&nbsp;</span>
                                                        <span class="d-xl-flex justify-content-xl-center">Avec</span>
                                                        <span class="text-center d-xl-flex justify-content-xl-center" style="display: block;font-size: 25px;font-weight: 700;">Gerkis</span>
                                                    </div>
                                                </div>
                                                <div id="audio-modal-spaceDiv"></div>
                                                <div id="audio-control-dv">
                                                    <div class="d-xl-flex justify-content-xl-center" id="audio-control-div-icon">
                                                        <button class="btn btn-primary rounded-circle" id="audio-control-mic-btn" type="button" style="height: 3rem;width: 3rem;">
                                                            <i class="fas fa-microphone-alt-slash"></i>
                                                        </button>        
                                                        <button class="btn btn-danger rounded-circle" id="audio-control-endCall-btn" type="button">
                                                            <i class="material-icons">call_end</i>
                                                        </button><button class="btn btn-primary rounded-circle" id="audio-control-volume-btn" type="button">
                                                            <i class="fa fa-volume-up"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>                                   
                                        
                                    </div> 
                                      <!--####  end   ####-->
                                
                                <div class="modal-footer" id="audio-modal-footer">
                                    <button class="btn btn-primary" id="audio-modal-footer-fermer" type="button" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div> 
</template>

<script>

export default {
 
   name:"AudioModal"

}

</script>

<style>
</style>
