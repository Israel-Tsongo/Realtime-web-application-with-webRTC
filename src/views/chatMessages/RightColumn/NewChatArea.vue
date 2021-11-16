<template>

 <!-- <div id="chat-panel" >
    <div class="message">
        <div v-for="msg in messages" :key="msg.msg" class="message__container">
          <p
            v-if="!msg.join"
            class="message__text"
            :class="{ own: msg.isMe, other: !msg.isMe}"
            v-message="msg.msg"
          ></p>
          <p 
            v-if="msg.join"
            class="message__joined"> 
            {{msg.msg}}</p>
        </div>
      </div>
</div> -->







  <div id="chat-panel">
      <a class="border rounded d-inline scroll-to-top" id="page-bottom" href="#inputAndSend-div">
        <i class="fas fa-angle-down"></i>
      </a>
            
            <div class="message">
               
                <div v-for="msg in messages" :key="msg.msg" class="message__container" v-bind:class="[!msg.isMe?'other-container':'own-container']" >
                  
                  
                    <div v-if="!msg.join" class="chat-bubble" v-bind:class="[!msg.isMe?'chat-bubble--left message-incoming-msg-div':'chat-bubble--right message-outcoming-msg-div']">
                        <p                      
                          class="message__text"                      
                          v-bind:class="[!msg.isMe?'messages-incoming-textPara other':'messages-outcoming-textPara own']"
                          v-message="msg.msg">
                        </p>
                    </div>

                    <div v-if="msg.join" class="messageInfo">
                        <p                           
                          class="message__joined messageInfo-para"> 
                          {{msg.msg}}
                        </p>
                      </div>
                </div>
            </div>
















               <!--#### <div  class="row no-gutters" style="width:auto,height:auto">

                  <div class="col-md-3 col-lg-6 col-xl-7"  v-bind:class="[!msg.isMe? '':'offset-xl-5 offset-md-9' ]" >
                      <div class="chat-bubble" v-bind:class="[!msg.isMe?'chat-bubble--left message-incoming-msg-div':'chat-bubble--right message-outcoming-msg-div' ]">
                          <p v-message="msg.msg"  v-bind:class="[!msg.isMe?'messages-incoming-textPara':'messages-outcoming-textPara']"> </p>
                          <span class="text-right messages-incoming-timeSpan" >
                            <span class="messages-incoming-time" v-bind:class="[!msg.isMe? '':'messages-outcoming-time']">12:56</span>
                          </span>
                      </div>
                  </div>
                </div> 

                  End Reception  ####-->                                                    
                
                <!--####  Small infoMessage  
                
                <div :key="msg.msg" v-if="msg.join" class="row" style="width:auto,height:auto" >
                    <div class="col d-xl-flex justify-content-xl-center align-items-xl-center">
                        <div id="messageInfo">
                            <p id="messageInfo-para">{{msg.msg}}</p>
                        </div>
                    </div>
                </div> ####--> 
                
                  <!--####  End Small infoMessage ####-->
                
                  <!--####  Emission ####--> 

                <!--<div :key="msg.msg" class="row no-gutters">
                    <div class="col-md-3 col-xl-7 offset-xl-5 offset-md-9">

                        <div class="chat-bubble chat-bubble--right message-outcoming-msg-div">
                            <p class="messages-outcoming-textPara">Est une technologie révolutionnaire qui ne mérite pas d'être néglige du fait de la gratuite de l'enseignement sans oublier la coiffure anatomique qui pourrai nous contraire du faite des calcul super méta fiasque du second siècle alla ronde du ménage a trois</p>
                            <span class="text-right messages-outcoming-timeSpan">
                            <span class="messages-outcoming-time">12:56</span>
                              <span>
                                <i class="fas fa-check" style="font-size: 12px;"></i>
                              </span>
                            </span>
                        </div>

                    </div>   
                </div>  -->

       

          <!--####  End Emission    ####-->                      
                        
  </div> 

</template>
   

<script>
export default {
  name: "ChatArea",
  props: {
    messages: Array,
    
    //chatContainer: String
  },
  data:()=>({

      maxMessageLength:30
  }),
  directives: {
    message: {
      bind: function(el, binding, vnode) {
        const isObj = typeof binding.value === 'object'
        let chunks
        const maxLength = vnode.context.maxMessageLength
        console.log("----",binding.value)
        if(isObj) {

          chunks = Math.ceil(binding.value.message.length / maxLength)
          el.innerHTML = `<span style="font-weight:bold">${binding.value.username}</span>: 
            ${vnode.context.getChunkText(binding.value.message, maxLength, chunks)}`


        } else {
          chunks = Math.ceil(binding.value.length / maxLength)
          el.innerHTML = vnode.context.getChunkText(binding.value, maxLength, chunks)
        }
      }
    }
  },
  methods: {
    getChunkText(message, maxLength, index){
      let newMessage= ''
      for(let i = 0; i < index; i++){
        const newChunk = message.slice(i*maxLength, maxLength*(i+1))
        if (i!==0) newMessage += '<br>'
        newMessage += `<span> ${newChunk} </span>`
      }
      return newMessage
    }





  },
  // watch: {
  //   messages: function(){
  //     //const chatArea = document.getElementsByClassName(this.chatContainer)[0]
  //     //chatArea.scrollTop = chatArea.scrollHeight + 100
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.message {
  padding-bottom: 2rem;
  
  &__text {
    width: max-content;
    padding: 0px 7px;
    border-radius: 10px;
  }

  &__joined{
    font-size: 0.9rem;
    font-style: oblique;
    margin: 0 auto;
  }

  &__container {
    width: 90%;
    padding-left: 2rem;
   
  }
  
}

.own {
   /* background: #0080001f;*/
    margin: 0;   
    
  }

  .other {
    /*background: #d6ca002b;*/
    float: left;    
    margin: 0;
    
  }

  .own-container{
   display: flex;
    justify-content: flex-end;
  }

  .other-container{
 
   display: flex;
    justify-content: flex-start;
  }
</style>

