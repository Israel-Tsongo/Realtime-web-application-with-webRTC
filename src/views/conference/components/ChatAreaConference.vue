<template>

<div class="scrollableDiv" style="height: 80%;padding-left: 1.2rem;">
            

            <div v-for="msg in messages" :key="msg.msg" style="padding: 5px 5px 5px 5px;">
                <!--<div style="display: flex;justify-items: center;width: 100%;height: auto;margin-bottom: 1.5rem;">
                    <div style="display: inline-block;width: 4rem;margin-right: 0.2rem;height: 4rem;"></div>
                    <div style="display: inline-block;padding: 10px 10px 0px 10px;border-radius: 6px;background-color: ivory;">
                        <p class="text-center" style="margin-bottom: 0.3rem;">Hey Guys !</p>
                    </div>
                </div>-->
                <div v-if="!msg.join" style="display: flex;justify-items: center;width: 100%;height: auto;margin-bottom: 2rem;">
                    <div style="display: inline-block;width: 20%;margin-right: 0.3rem;height: auto;">
                        <span  v-if="false" class="rounded-circle" style="height: auto;width: auto;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1;margin-right: 0.3rem;">
                            <img class="img-fluid rounded-circle" src="assets/img/114%20.jpg" width="40px" height="40px">
                            <span class="rounded-circle" style="position: absolute;bottom: -1px;border: 4px solid white;right: -5px;display: inline-block;width: 15px;height: 15px;z-index: 100;background-color: rgb(216,216,219);">
                                <span class="rounded-circle" style="background-color: greenyellow;display: inline-block;height: 10px;width: 10px;position: inherit;">
                                </span>
                            </span>
                        </span>
                    </div>
                    <div style="display: inline-block;padding: 10px 10px 0px 10px;border-radius: 15px 15px 15px 0px;background-color: ivory;width: 75%;height: auto;">
                        <p class="align-left" v-message="msg.msg" ></p>
                    </div>
                </div>

              <!-- <div style="display: flex;justify-items: center;width: 100%;height: auto;margin-bottom: 2rem;">
                    <div style="display: inline-block;width: 20%;margin-right: 0.3rem;height: auto;">
                        <span class="rounded-circle" style="height: auto;width: auto;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1;margin-right: 0.3rem;">
                            <img class="img-fluid rounded-circle" src="assets/img/114%20.jpg" width="40px" height="40px">
                            <span class="rounded-circle" style="position: absolute;bottom: -1px;border: 4px solid white;right: -5px;display: inline-block;width: 15px;height: 15px;z-index: 100;background-color: rgb(216,216,219);">
                                <span class="rounded-circle" style="background-color: greenyellow;display: inline-block;height: 10px;width: 10px;position: inherit;">
                                </span>
                            </span>
                        </span>
                    </div>
                    <div style="display: inline-block;padding: 10px 10px 0px 10px;border-radius: 15px 15px 15px 0px;background-color: ivory;width: 75%;height: auto;">
                        <p>Ohhh !! je me souviens bro il faut qu'on se voit pour finaliser ce probleme une bonne fois pour toute.</p>
                    </div>
                </div> -->
            </div>
        </div>
    
</template>
<script>
export default {
   
    name:"ChatAreaConference",
    props: {
    messages: Array,
    maxMessageLength: Number,
    chatContainer: String
  },
  directives: {
    message: {
      bind: function(el, binding, vnode) {
        const isObj = typeof binding.value === 'object'
        let chunks
        const maxLength = vnode.context.maxMessageLength

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
  watch: {
    messages: function(){
      const chatArea = document.getElementsByClassName(this.chatContainer)[0]
      chatArea.scrollTop = chatArea.scrollHeight + 100
    }
  }
    
}
</script>
<style>

</style>