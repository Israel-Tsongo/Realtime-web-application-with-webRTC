<template>

<div id="chat-div" style="height: 50rem;width: 24%;display: inline-block;background: rgba(235,237,239,0.73);border-radius: 50px 0px 0px 50px;margin-top: -5rem;">
        <div style="width:100%;height: 45px;padding-left: 2rem;display: flex;justify-content: center;justify-items: center;margin-top: 30px;">
            <div style="width: 95%;height: 40px;">
                <button @click="display='Chat'" class="btn btn-primary" type="button" style="margin-right: 0.4rem;width: 127px;">
                    <span style="margin-right: 8px;margin-bottom: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-chat-fill">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"></path>
                        </svg>
                    </span>Chat
                </button>
                <button @click="display='Participant'" class="btn btn-primary" type="button">
                    <span style="margin-right: 10px;">
                        <i class="fa fa-group"></i>
                    </span>Participant
                </button>
            </div>
        </div>
       
        <ChatOnlineAvatar></ChatOnlineAvatar>        
           
        <ChatAreaConference
             v-if="display=='Chat'"  
             :messages="messages"  
             :maxMessageLength="maxMessageLength" 
             :chatContainer="chatContainer" >              
        </ChatAreaConference>
         
        <ChatParticipantConference v-if="display=='Participant'" > </ChatParticipantConference>       

        <div style="height: 17vh;justify-content: start;padding-left: 1rem;">
            <div style="height: 30px;display: inline-block;width: 70%;">
                <p style="width: 50%;font-size: 12px;">
                    <i class="fas fa-pen"></i>&nbsp;Israel Typing...
                </p>
            </div>
            <div style="width: 100%;">
                <div style="height: 75px;width: 77%;padding: 5px;border-radius: 20px;border: 4px solid white;display: inline-block;margin-right: 0.5rem;">
                    <div style="display: flex;align-items: center;height: auto;">
                        <div style="width: 73%;/*background: rgb(66,104,214);*/height: 34px;display: inline-block;">
                            <input v-model="message" type="text" @keyup.enter="sendMessage()" placeholder="Message ..." style="margin-top: 7px;height: 25px;width: 90%;outline: none;background-color: rgba(235,237,239,0.73);border: none;border-bottom-width: 1px;">
                        </div>
                        <span style="margin-right: 0.3rem;height: 2rem;display: inline-block;margin-top: 0.2rem;">
                            <i class="fas fa-paperclip" style="font-size: 18px;"></i>
                        </span>
                        <span style="display: inline-block;height: 2rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-emoji-smile" style="font-size: 20px;">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                            </svg>
                        </span>
                    </div>
                    <span> </span>
                </div>
                <button  @click="sendMessage()" class="btn btn-primary" type="button" style="display: inline-block;width: 43px;height: 40px;border-radius: 15px;">
                    <i class="fa fa-send"></i>
                </button>
            </div>
        </div>
</div>
    
</template>
<script>
import ChatOnlineAvatar from './ChatOnlineAvatar.vue'
import ChatAreaConference from './ChatAreaConference.vue'
import ChatParticipantConference from './ChatParticipantConference.vue'

export default {
    name:"ChatConference",
    components:{ChatOnlineAvatar,ChatAreaConference,ChatParticipantConference},
    props:{
        messages: Array,
        maxMessageLength: Number,
        chatContainer: String

    },
    data(){

        return{
            display:'Chat',
            message: ""
        }
    },
    methods: {
    sendMessage() {
      const msg = this.message.replace(/\n/g,'')
      // Do not send empty messages
      if(msg.replace(/\s/g, "").length === 0) return
      this.$emit("send-message", msg)
      this.message = ""
    }

  }
    
}
</script>
<style>

</style>