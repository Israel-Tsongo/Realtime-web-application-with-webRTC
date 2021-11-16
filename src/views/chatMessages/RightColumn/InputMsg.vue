

<template>

 <!--##### Input ####-->
 <div>
                                                                             
   <div :disabled="allPrivateChatInfo.closed" id="div-under-divInside-inputAndSend" >
      <form id="messages-input-form">
         <div id="messages-input-div" class="input-field">
            <span class="d-flex justify-content-center align-items-center" id="messages-input-emojiSpan">
               <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" id="messages-input-emojIcon">
                        <path d="M14.8284 14.8284C13.2663 16.3905 10.7337 16.3905 9.17157 14.8284M9 10H9.01M15 10H15.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
               </svg>
            </span>
               <textarea v-model="privateMessage" @keyup.enter="sendPrivateMessage(privateMessage)" class="form-control" type="text" id="messages-inputField" placeholder="Typer un message"></textarea>
            <span class="d-xl-flex align-items-xl-center" id="messages-input-fileSpan">
               <i class="material-icons" id="messages-input-fileIcon">attach_file</i>
            </span>
         </div>
      </form>
      <div class="d-xl-flex justify-content-xl-center align-items-xl-center" id="messages-sendDiv">
         <button @click="sendPrivateMessage(privateMessage)"  class="btn btn-primary rounded-circle" id="messages-send-Button" type="button">
           <i class="fa fa-paper-plane" aria-hidden="true"></i>
         </button>
      </div>
   </div>
 </div>                                                                       
   <!--##### End Input ####-->
                                                        
</template>


<script>
import { WS_EVENTS } from "./../../../utils/config"

export default {
   
 
   name:"InputMsg",
   data:function(){
         return {

            privateMessage: ""
         }

   },
   props:{      
     allPrivateChatInfo:Object
   },
   methods:{

      sendPrivateMessage(msg) {
      // Do not send empty messages
      if(typeof msg !== "object" && this.privateMessage.replace(/\s/g, "").length === 0) return

      this.$socket.emit(WS_EVENTS.privateMessage, {
        privateMessage: msg,
        to: this.allPrivateChatInfo.user,
        from: this.$store.state.username,
        room: this.allPrivateChatInfo.room
      })
      this.privateMessage = ""
    },


   }

}


</script>


<style>




</style>
