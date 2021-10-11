
<template>

 <!--#############   Left main column ,  List of  Contact  ############--> 
                  
                  
<div class="col-sm-5 col-md-4 col-lg-4 col-xl-4 d-xl-flex align-items-xl-center" id="col-rowMsg">  
    <div id="mainDiv-listContact">
    
      <!--####  Contact  info ####-->  
                                                        
      <InfoContact v-bind:imageProfile="this.imgProfile">         
      
      </InfoContact>
        
        <!--####  End Contact  info ####-->  
        
        <!--####  List of Contact  #####-->
        
      <ListContact @open-chat="openTheChat" v-bind:users="users" v-bind:openPrivateChat="openPrivateChat">          
        
      </ListContact>          
        
        <!--#########  End  #############-->
        
    </div>
  </div>
                                                                
                                                             

</template>

<script>
import InfoContact from "./InfoContact.vue"
import ListContact from "./ListContact.vue"

export default {

   name:"LeftColumn" ,     
   components:{InfoContact,ListContact},

   props:{
     imgProfile:String,
     users:Array,
     openPrivateChat:Boolean,

   },
   methods:{

     openTheChat({user,matricule}){
        this.$emit("open-chat",{user,matricule} )


     }


   }


}

</script>

<style>
</style>
