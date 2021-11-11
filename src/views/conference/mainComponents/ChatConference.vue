<template>

<div id="chat-div" style="height: 93%;width: 28%;display: inline-block;background:rgb(243, 243, 243);border-radius: 30px 30px 30px 30px;margin-top: -3rem;">
        <div style="width:100%;height: 15%;padding-left: 0.5rem;display: flex;justify-content: center;justify-items: center;padding-top: 10px; border-radius:30px 30px 0px 0px; background-color:rgb(216, 223, 241)">
            <div style="width: 95%;height: 40px;">
                <button @click="setDisplay('Chat')" class="btn btn-primary" type="button" style="margin-right: 0.4rem;width: 127px;">
                    <span style="margin-right: 8px;margin-bottom: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-chat-fill">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"></path>
                        </svg>
                    </span>Messages
                </button>
                 <button @click="setDisplay('Fichier')" class="btn btn-primary" type="button" style="margin-right: 0.4rem;width: 127px;">
                    <span style="margin-right: 8px;margin-bottom: 10px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-chat-fill">
                            <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"></path>
                        </svg>
                    </span>Fichiers
                </button>
                <button @click="setDisplay('Participant')" class="btn btn-primary" type="button" style="margin-top:8px;border: 3px solid #4e73df">
                    <span style="margin-right: 10px;">
                        <i class="fa fa-group"></i>
                    </span>Participants
                </button>
            </div>
        </div>
       
        <!--<ChatOnlineAvatar></ChatOnlineAvatar> -->       
           
        <ChatAreaConference

              v-show="display=='Chat'"  
             :messages="messages"             
             :conference="conference"
             :fileToSend="file" >              
                           
        </ChatAreaConference>

        <ChatFiles
             v-show="display=='Fichier'"  
             :messages="messages"             
             :conference="conference"
             :downloadAnchor="downloadAnchor"
             :fileToSend="file" >              
                           
        </ChatFiles>
         
        <ChatParticipantConference v-show="display=='Participant'" :users="users" > </ChatParticipantConference>       

        <div v-if="display=='Chat'" style="height: 10%;justify-content: start;padding-left: 1rem;border-radius:0px 0px 30px 30px;  background-color:rgb(216, 223, 241)">
           
            <div style="width: 100%; display:flex; align-items:center">
                <div style="height: 60px;width: 82%;padding: 5px;border-radius: 20px; display: inline-block;margin-right: 0.5rem;">
                    <div style="display: flex;align-items: center;height: auto;">
                        <div style="width: 80%;/*background: rgb(66,104,214);*/height: 34px;display: inline-block;">
                            <textarea name id  v-model="message" type="text" cols="7" rows="4"  @keyup.enter="sendMessage()" placeholder="Message ..." style="padding-left:7px;height: 40px;width: 95%;outline: none;background-color: white;border: none;border-bottom-width: 1px; border-radius:10px"></textarea>
                        </div>

                        <span @click="chooseFile()" style="margin-right: 0.3rem;height: 2rem;display: inline-block;margin-top: 0.2rem;">
                            <i class="fas fa-paperclip" style="font-size: 18px; color:blue"></i>
                        </span>

                        
                        <span style="display: inline-block;height: 2rem; color:blue">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-emoji-smile" style="font-size: 20px;">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"></path>
                            </svg>
                        </span>
                    </div>
                    <span> </span>
                </div>
                <button  @click="sendMessage()" class="btn btn-primary" type="button" style="display: inline-block;width: 43px;height: 40px;border-radius: 15px; margin-top:-8px">
                    <i class="fa fa-send"></i>
                </button>
            </div>
             <input id="select-file-input" name="file" ref="fileToTransf" style="visibility:hidden" @change="onSelect" type="file" >

        </div>
</div>
    
</template>
<script>
//import ChatOnlineAvatar from '../components/ChatOnlineAvatar.vue'
import ChatAreaConference from '../components/ChatAreaConference.vue'
import ChatParticipantConference from '../components/ChatParticipantConference.vue'
import ChatFiles from '../components/ChatFiles.vue'


export default {
    name:"ChatConference",
    components:{ChatAreaConference,ChatParticipantConference,ChatFiles},
    props:{
        users:Array,
        messages: Array,
        conference:Object,
        downloadAnchor:Object                 

    },
    data(){

        return{
            display:'Fichier',
            message: "",            
            file:undefined
        }
    },
    methods: {
        
        setDisplay(el){

            this.display=el
            
        },
        chooseFile(){
             this.$refs.fileToTransf.click()            

         },
         onSelect(event){
        this.file = event.target.files[0];
    },
        sendMessage() {
         console.log('send Mesage')
        if(this.file==undefined){

            const msg = this.message.replace(/\n/g,'')
            // Do not send empty messages
            if(msg.replace(/\s/g, "").length === 0) return
            this.$emit("send-message",{type:"text",msg})
            this.message = ""
        }else{
           
            this.$emit("share-file",{file:this.file})
        }
        }
   

  }
    
}
</script>
<style>

</style>