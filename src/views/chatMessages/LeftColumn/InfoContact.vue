

<template>
<div id="listContact-info">

    <div class="row" id="contact-info-row">
        <div class="col-sm-5 col-lg-5 col-xl-4">
            <span id="contact-info-name">{{this.$store.state.username}}</span>
        </div>
        <div class="col-sm-4 col-lg-4 col-xl-4 offset-sm-1 offset-lg-2 offset-xl-2 d-sm-flex align-items-sm-center">
            <span class="contact-info-spanIcons">
                <i class="fas fa-search contact-info-icons" style="font-size: 20px;"></i>
            </span>
            <span class="contact-info-spanIcons">
                <i class="material-icons contact-info-icons">airplanemode_inactive</i>
            </span><span class="contact-info-spanIcons">
                <i class="fa fa-ellipsis-v contact-info-icons"></i>
            </span>
        </div>
    </div>
    
    <form id="contact-info-form">
        <div id="contactList-div-search">
            <div id="inside-div-search-in-listContacts" class="input-field"><span class="d-flex justify-content-center align-items-center" id="contactInfo-search-span-icon"><i class="fa fa-search rounded-circle"></i></span><input class="form-control" type="text" id="contact-info-searchInput" placeholder="Recherche"></div>
        </div>
    </form>
   <!-- class="rounded-circle" v-bind:class="myStatus"-->
    <span id="list-contact-img-span">
        <img class="img-fluid rounded-circle" id="listContactInfo-profile-img" :src="this.imageProfile">
        <span id="localOnlineStatus"    class="rounded-circle">
            <span @click="changeStatus()"   class="rounded-circle" v-bind:class="myStatus"></span>
           
        </span>
        
    </span>
</div>






<!--######### End ###############-->
                                                        
</template>


<script>
import { STORE_ACTIONS, STATUS_OPTIONS, WS_EVENTS } from "./../../../utils/config"
 export default {
 
   name:"InfoContact",
   props:{

       imageProfile:String
   },
   data:()=>({
       
        status: {
            available_status: "#05b105",
            absent_status: "#f7bb04",
            unavailable_status: "#bb0000"
            }
       }),

  

   methods:{

       changeStatus() {
            this.$store.dispatch(STORE_ACTIONS.changeStatus).then( ()=> {
                this.$socket.emit(WS_EVENTS.changeStatus, this.$store.state)
            })
    }

   },
   computed:{

       myStatus: function() {

        return {
            available: this.$store.state.status === STATUS_OPTIONS.available,
            absent: this.$store.state.status === STATUS_OPTIONS.absent,
            unavailable: this.$store.state.status === STATUS_OPTIONS.unavailable
        }
    },
   }

}


</script>


<style lang="scss" scoped >
@import "./../../../styles/variables";
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
