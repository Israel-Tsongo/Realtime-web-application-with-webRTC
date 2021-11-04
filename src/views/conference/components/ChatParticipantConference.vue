<template>
 <div style="padding-top: 1rem;height: 80%;padding-left: 0.2rem;">
            
            <div v-for="(user,index) in users" :key="index" style="padding: 5px 5px 0px 5px;display: flex;justify-items: center ">
                
                <div style="box-shadow: 1px 1px 7px blue; display: flex;justify-items: center;width: 95%;height: auto;margin-bottom: 0rem;background-color:white;border-radius: 10px ;">
                    <div style="display: inline-block;width: 30%;margin-right: 0.3rem;height: auto;">
                        <span class="rounded-circle" style="height: 60px;width:60px;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1;margin-right: 0.3rem; ">
                            <img class="img-fluid rounded-circle" :src="imageProfile+user.matricule" width="inherit" height="inherit" style="box-shadow:1px 1px 5px blue">
                            <span v-bind:class="user.status" class="rounded-circle " style="position: absolute;bottom: -1px;border: 4px solid white;right: -5px;display: inline-block;width: 15px;height: 15px">
                                
                            </span>
                         </span>
                        
                    </div>
                    <div style="/*background-color: ivory;*/width: 60%;height: auto;">
                        <div style="width: 100%;height: auto;" >
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Nom: <span style="font-weight:normal">{{ " "+user.username}} </span></span> <br>
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Service: <span style="font-weight:normal">{{ user.service}} </span> </span ><br>
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Fonction:<span style="font-weight:normal" > {{user.fonction}} </span></span>
                        </div>
                    </div>
                </div>
            </div>                      
                   
        </div>
    
</template>
<script>
import { url } from "./../../../utils/config"
export default {
    name:"ChatParticipantConference",
    props:{
        users:Array,

    },
    data:()=>({
        imageProfile:"",
    }),
    async mounted(){
    this.imageProfile= await `${url}/profile/image?matricule=`
  },
    computed: {
    
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