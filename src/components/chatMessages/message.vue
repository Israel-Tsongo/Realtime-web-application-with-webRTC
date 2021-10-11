
<template>

  
    <div id="wrapper">
        <div class="d-flex flex-column" id="content-wrapper">
            <div id="content">
            
            
            <!--#######################   navbar ########### Component ##############-->           
            
               <navbar>
               
               </navbar> 
                          
    <!--####################### end navBar ##########################-->           
                
                <div class="container-fluid">
                    <section id="main-section">
                        <div class="row" id="main-row">
                            <div class="col-lg-8 col-xl-12 d-xl-flex justify-content-xl-center align-items-xl-center">
                                <div class="card" id="main-card">
                                    <div class="card-body" id="mainCardBody">
                                        <div id="mainDivMsg">
                                            <div class="row" id="rowMsg">                                               
                                                
         <!--################   Left main column ,  List of  Contact  #############################--> 
                                                
                                                    <leftColumn>                                                   
                                                    
                                                    
                                                    </leftColumn>                                                     
                                                            
                                                
                                                 <!--######  End LeftColumn  ######-->
                                                 
                                                 
                                                <!--#############   Right main column ,  List of  Allmessages  #######--> 
                                                      
                                                      <rightColumn>
                                                      
                                                      </rightColumn>
                                                      
                                                <!--######  End RightColumn ######-->
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!--################  Video modal ####################-->
                        
                        <div class="modal fade" role="dialog" tabindex="-1" id="videoAppelModal">
                            <div class="modal-dialog" role="document" style="max-width: 55rem;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Appel video&nbsp;</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    
                                    <!--#####  Video modal  body ####-->
                                    
    
                                        <video>
                                        
                                        
                                        <video>
                                    
                                     <!--################  end  ####################-->
                                    <div class="modal-footer" id="video-modal-footer"><button class="btn btn-primary" id="video-modal-btn-fermer" type="button" data-dismiss="modal">Fermer</button></div>
                                </div>
                            </div>
                        </div>
                        
                        
                                 <!--################  Audio Modal ####################-->
                        
                        <div class="modal fade" role="dialog" tabindex="-1" id="audioAppelModal">
                            <div class="modal-dialog" role="document" style="max-width: 30rem;max-height: 50rem;">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">Appel Audio</h4><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    
                                     <!--####  Audio modal  body ####-->
                                    
                                    <audioModal>
                                    
                                    
                                    </audioModal>
                                    
                                    <!--####  end  ####-->
                                    
                                    <div class="modal-footer" id="audio-modal-footer"><button class="btn btn-primary" id="audio-modal-footer-fermer" type="button" data-dismiss="modal">Fermer</button></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
   
</template>




<script>


</script>

<style>

       @import './assets/fonts/material-icons.min.css';
       @import './assets/css/styles.css';
       @import './assets/fonts/material-icons.min.css';
       @import './assets/fonts/ionicons.min.css';
       @import './assets/fonts/font-awesome.min.css';
       @import './assets/fonts/fontawesome-all.min.css';
       @import './assets/fonts/fontawesome5-overrides.min.css';
       @import './assets/bootstrap/css/bootstrap.min.css';
       @import './assets/css/chatMessage.css';
     
</style>

