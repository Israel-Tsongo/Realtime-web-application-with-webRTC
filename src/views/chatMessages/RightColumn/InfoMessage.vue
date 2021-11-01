

<template>
<!--################  Message info  ####################-->
                                                      
<div id="messages-info-div">
<!--
    <div class="row">
        <div class="col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center">
            <div id="messages-user-nfo">
                <div id="messages-info-img"><span id="messages-info-spanImg"><img class="img-fluid rounded-circle" id="messages-info-imgProfile" src="assets/img/114%20.jpg" style="width: 100%;height: 100%;"></span></div>
                <div id="messages-info-personnal">
                    <h4 style="font-size: 18px;">{{allPrivateChatInfo.user}}</h4><span style="font-size: 14px;">Aujourdhui a 10 h 30</span>
                </div>
            </div>
        </div>
        <div class="col-4 d-xl-flex justify-content-xl-center">
            <div class="d-xl-flex justify-content-md-center align-items-md-center" id="messages-info-search-div">
                <div id="messages-info-search-inside-div">
                    <form class="d-none d-sm-inline-block mr-auto ml-md-12 my-2 my-md-0 mw-100 navbar-search" id="messages-form">
                        <div class="input-group" style="display:flex;  justify-content: center; align-items:center;">

                            <input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                            <div class="input-group-append"><button class="btn btn-primary py-0" style="display:inline-block;max-width:50px;max-height:40px" type="button"><i class="fas fa-search"></i></button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col d-xl-flex justify-content-xl-center align-items-xl-center">
            <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-info-divIcons">
                <div id="messages-info-inside-divIcons">
                        <span class="messages-info-spanIcons" style="display: inline-block;margin-right: 2rem;"  >
                            <i @click="toggleCall('Audio')" class="icon ion-android-call messages-info-icons"></i>
                        </span>
                        <span  class="messages-info-spanIcons" style="display: inline-block;margin-right: 2rem;"  >
                            <i @click="toggleCall('Video')" class="icon ion-ios-videocam messages-info-icons"></i>
                        </span>
                        <span @click="closeIt()"  class="d-xl-flex align-items-xl-center messages-info-spanIcons">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="messages-info-icons">

                                <path d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z" fill="currentColor"></path>
                                <path d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" fill="currentColor"></path>
                                <path d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z" fill="currentColor"></path>
                            </svg>
                       </span>
                </div>
            </div>
        </div>
    </div> ####-->


    <div class="row rowInfo">
        <div class="col-md-3 col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center colsMessages">
            <div  id="messages-user-nfo">
                <div id="messages-info-img">
                    <span id="messages-info-spanImg">
                        <img class="img-fluid rounded-circle" id="messages-info-imgProfile" :src="this.imageProfile" >
                        <span v-for="user in userLst"  :key="user.username" class="remoteOnlineStatusInfo rounded-circle">
                            
                            <span v-bind:class="user.status" class="rounded-circle"></span> 
                                                  
                        </span>
                    </span>
                </div>
                <div id="messages-info-personnal">
                    <h4 id="remoteName">{{allPrivateChatInfo.user}}</h4>
                    <span v-for="user in userLst"  :key="user.username">
                        <span id="remoteStateConnection">{{user.status=="available"?"En ligne":user.status=="unavailable"?"Deconnectee":user.status}}</span>
                     </span>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-xl-4 d-xl-flex justify-content-xl-center colsMessages">
            <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-info-search-div">
                <div id="messages-info-search-inside-div">
                    <form class="d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" id="messages-form">
                        <div class="input-group">
                            <input class="bg-light form-control border-0 small" type="text" placeholder="Search for ...">
                            <div class="input-group-append">
                                <button class="btn btn-primary py-0" type="button">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-5 col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center colsMessages">
            <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-info-divIcons">
                <div id="messages-info-inside-divIcons">
                    <span @click="toggleCall('Audio')" class="messages-info-spanIcons" data-toggle="modal" data-target="#audioAppelModal">
                        <i class="icon ion-android-call messages-info-icons"></i>
                    </span>
                    <span @click="toggleCall('Video')" class="messages-info-spanIcons" data-toggle="modal" data-target="#videoAppelModal">
                        <i class="icon ion-ios-videocam messages-info-icons"></i>
                    </span>
                    <span @click="closeIt()"  class="d-xl-flex align-items-xl-center messages-info-spanIcons">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="messages-info-icons">

                            <path d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z" fill="currentColor"></path>
                            <path d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z" fill="currentColor"></path>
                            <path d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z" fill="currentColor"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>

</div>
                                                        
</template>


<script>
import {url}from "./../../../utils/config"
export default {
 
   name:"InfoMessage",
   props:{
         allPrivateChatInfo:Object,
         users:Array

   },
   data:function(){

       return{
         imageProfile:""
       }
   },
   async created(){
    this.imageProfile= await `${url}/profile/image?matricule=${this.allPrivateChatInfo.matricule}`

   },
   methods:{

      toggleCall(typeOfCall){ 

            this.$emit("callToggled",typeOfCall) 
            console.log("Halla")           

      },
      closeIt(){

           this.$emit("closeIt")

      }

   },
   computed: {
    
    userLst: function()  {

      let currentUsername=this.$store.state.username
      
      
      return this.users.filter(function (user) {

              console.log("username from array",user.username)
              console.log("hey username",currentUsername)
               return currentUsername !== user.username
             
      })

    }
  
  }

}


</script>


<style lang="scss" scoped >

.available {
    background-color:#05b105 !important;
  }
.absent {
    background-color:#f7bb04 !important;
  }
.unavailable {
    background-color:#bb0000 !important;
  }

</style>