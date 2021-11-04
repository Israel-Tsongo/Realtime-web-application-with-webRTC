

<template>

            <!--#######################   navbar #########################-->            


    <nav class="navbar navbar-light navbar-expand-lg bg-primary fixed-top" id="mainNav" >
        <div class="container-fluid">
            <a class="navbar-brand js-scroll-trigger" id="brand-title" href="#"><span><i class="fa fa-video-camera"></i>&nbsp;</span>MakeACall</a>
            <button data-toggle="collapse" class="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive">
                <span class="sr-only">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive" style="width: 891.6px;">
                
                <ul class="navbar-nav mx-auto navClass" >

                    <li style="cursor:default" @click="changeScreen('Home')" class="nav-item"><a style="text-decoration:none" class="nav-link active js-scroll-trigger navColor" >Home</a></li>
                    <li style="cursor:default" @click="changeScreen('PrivateChatScreen')" class="nav-item"><a style="text-decoration:none" class="nav-link js-scroll-trigger navColor" >Messages</a></li>
                    <li style="cursor:default" @click="changeScreen('ConferenceScreen')" class="nav-item"><a  class="nav-link js-scroll-trigger navColor"  style="color: rgba(15,10,10,0.9);text-decoration:none">Video conference</a></li>
                    
                    <li style="cursor:default" class="nav-item"><a style="text-decoration:none" class="nav-link js-scroll-trigger navColor">A propos</a></li>
                    
                       
                   
                   <li style="cursor:default"  @click="dropdown()" class="nav-item d-lg-flex justify-content-lg-center align-items-lg-center" id="profileDropdown">
                        <div @click="dropdown()" class="nav-item dropdown show">
                           
                           <!-- <a aria-expanded="false" data-toggle="dropdown show">
                                <span class="text-monospace text-capitalize" style="height: 2rem;display: inline-block;width: auto;font-size: 19px;color: white;">{{this.$store.state.username}}&nbsp;
                                    <img class="img-fluid rounded-circle imgProfile" :src="this.imgProfile" style="width:20px height:20px">
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item text-monospace text-capitalize">Profile</a>
                                <a class="dropdown-item text-monospace text-capitalize" href="#">Parametre</a>
                                <a class="dropdown-item text-monospace text-capitalize" href="#">Logout</a>\
                            </div>-->
                        </div>

                    </li> 
                    <div id="profileDropdown"> <DropDown @logout="logout()" @changeScreen="changeScreen($event)" v-bind:imgProfile="imgProfile" ></DropDown> </div> 
                   
                </ul>
            </div>
        </div>
    </nav>
    



</template>

<script>
var JQuery=require("jquery")
  window.JQuery=JQuery;
  window.$=JQuery;

import DropDown from "./DropDown"


export default {
 
   name:"Navbar",
   components:{DropDown},
   props:{

       imgProfile:String
   },
  
   methods:{

       logout(){
           this.$emit("logout")
           console.log("logout")
          
       },
        changeScreen(screenName){

           this.$emit("changeScreen",screenName)
           console.log("screen change",screenName)
          
       },
       
   }
   

}

</script>

<style>
#profileDropdown{

    display: inline-block;
    width:100px; 
    height:50px;
    border: 2px solid white;
    position:relative;
    left: 50rem;
    top:1%;
    z-index: 10000;
    
   
}

</style>
