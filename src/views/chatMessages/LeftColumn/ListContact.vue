

<template>

<!--####  List of Contact  #####-->
                                                        
<div id="listcontact-div">

	<div id="inside-listContact-div" > 
	
	
  <div v-for="(user,index) in userList" :key="'contactRow-'+index" class="row contact-row" v-bind:disabled="openPrivateChat" >	

        

            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-3 d-xl-flex justify-content-xl-center align-items-xl-center contact-col-image">
              <span class="contact-span-image">
                  <img class="img-fluid contact-img" :src="imageProfile+user.matricule">
                  <span class="remoteOnlineStatus rounded-circle">
                    <span class="rounded-circle"></span>
                  </span>
              </span>
            </div>
            <div class="col-sm-10 col-md-10 col-lg-10 col-xl-9 offset-sm-0 contact-col-content" @click="openChat(user.username,user.matricule)">
                <div class="row">
                    <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 align-self-sm-center">
                        <h6 class="contact-head-title">{{user.username}}</h6>
                    </div>
                    <div class="col-sm-3 col-md-3 col-lg-3 col-xl-3 div-timeSpan">
                      <span class="time-span">12:29</span>
                    </div>
                </div>
                <p class="contact-text-para">
                  <span class="contact-last-name">Celestin :&nbsp;</span>&nbsp;Halla Madrida</p>
                <hr class="contact-horizontal-line">
            </div>
      
        
		
	</div>

	</div>
  
</div> 

<!--#########  End  ######-->
                                                        
</template>

<script>

import { STORE_ACTIONS, STATUS_OPTIONS, WS_EVENTS,url } from "./../../../utils/config"

export default {
  name: "ListContact",
  props: {
    users: Array,
    openPrivateChat: Boolean
  },
  data: () => ({
    imageProfile:"",
    status: {
      available_status: "#05b105",
      absent_status: "#f7bb04",
      unavailable_status: "#bb0000"
    }
  }),
  async created(){
    this.imageProfile= await `${url}/profile/image?matricule=`
  },
  methods: {
    openChat(user,matricule) {
      this.$emit("open-chat", {user,matricule})
    },
    changeStatus() {
      this.$store.dispatch(STORE_ACTIONS.changeStatus).then( ()=> {
        this.$socket.emit(WS_EVENTS.changeStatus, this.$store.state)
      })
    }
  },
  computed: {
    myStatus: function() {
      return {
        available: this.$store.state.status === STATUS_OPTIONS.available,
        absent: this.$store.state.status === STATUS_OPTIONS.absent,
        unavailable: this.$store.state.status === STATUS_OPTIONS.unavailable
      }
    },
    userList: function()  {

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



<style>




</style>
