

<template>

            <!--#######################   navbar #########################-->            
            
    <nav class="navbar navbar-light navbar-expand-lg bg-primary fixed-top" id="mainNav">
        <div class="container-fluid"><a class="navbar-brand js-scroll-trigger" id="brand-title" href="#"><span><i class="fa fa-video-camera"></i>&nbsp;</span>MakeACall</a><button data-toggle="collapse" class="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navbarResponsive" style="width: 891.6px;">
                <ul class="navbar-nav mx-auto navClass">

                    <li class="nav-item"><a  class="nav-link active js-scroll-trigger navColor" >Home</a></li>
                    <li @click="changeScreen('PrivateChatScreen')" class="nav-item"><a class="nav-link js-scroll-trigger navColor" >Messages</a></li>
                    <li @click="changeScreen('ConferenceScreen')" class="nav-item"><a  class="nav-link js-scroll-trigger navColor"  style="color: rgba(15,10,10,0.9);">Video conference</a></li>
                    
                    <li @click="logout()" class="nav-item"><a class="nav-link js-scroll-trigger navColor">A propos</a></li>
                    <li class="nav-item d-lg-flex justify-content-lg-center align-items-lg-center" id="profileDropdown">
                        <div class="nav-item dropdown">
                            <a aria-expanded="false" data-toggle="dropdown">
                                <span class="text-monospace text-capitalize" style="height: 2rem;display: inline-block;width: auto;font-size: 19px;color: white;">Israel Tsongo&nbsp;
                                    <img class="img-fluid rounded-circle imgProfile" :src="this.imgProfile">
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <router-link :to="{name:'profile'}" class="dropdown-item text-monospace text-capitalize">Profile</router-link>
                                <a class="dropdown-item text-monospace text-capitalize" href="#">Parametre</a>
                                <a class="dropdown-item text-monospace text-capitalize" href="#">Logout</a>\
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


</template>

<script>

export default {
 
   name:"Navbar",
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
</style>
