

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
    <span id="list-contact-img-span">
        <img class="img-fluid rounded-circle" id="listContactInfo-profile-img" :src="this.imageProfile">
        <span id="localOnlineStatus" class="rounded-circle">
            <span class="rounded-circle"></span>
        </span>
    </span>
</div>







<!--####  Contact  info 
                                                                                                        
<div id="listContact-info">                                                       

    <div class="row" id="contact-info-row">
        <div class="col-sm-5 col-lg-5 col-xl-4">
            <span id="contact-info-name">{{this.$store.state.username}}</span>
        </div>
        <div class="col-sm-4 col-lg-4 col-xl-4 offset-sm-1 offset-lg-2 offset-xl-4 d-sm-flex align-items-sm-center"><span class="contact-info-spanIcons"><i class="fas fa-search contact-info-icons" style="font-size: 25px;"></i></span><span class="contact-info-spanIcons"><i class="material-icons contact-info-icons">airplanemode_inactive</i></span><span class="contact-info-spanIcons"><i class="fa fa-ellipsis-v contact-info-icons"></i></span></div>
    </div>
    
    <form id="contact-info-form">
        <div id="contactList-div-search">
            <div id="inside-div-search-in-listContacts" class="input-field">
                <span class="d-flex justify-content-center align-items-center" id="contactInfo-search-span-icon">
                    <i class="fa fa-search rounded-circle"></i>
                </span>
                <input class="form-control" type="text" id="contact-info-searchInput" placeholder="Recherche">
            </div>
        </div>
    </form><span id="list-contact-img-span"><img class="img-fluid rounded-circle" id="listContactInfo-profile-img" src="assets/img/114%20.jpg"></span>
</div> ####-->  
	
<!--######### End ###############-->
                                                        
</template>


<script>

 export default {
 
   name:"InfoContact",
   props:{

       imageProfile:String
   }

}


</script>


<style>




</style>
