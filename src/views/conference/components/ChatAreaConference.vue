<template>

<div class="scrollableDiv" style="height:77%;overflow-y:scroll;overflow-x:hidden">
            

          <!--  <div v-for="msg in messages" :key="msg.msg" style="padding: 5px 5px 5px 5px;">
                <div style="display: flex;justify-items: center;width: 100%;height: auto;margin-bottom: 1.5rem;">
                    <div style="display: inline-block;width: 4rem;margin-right: 0.2rem;height: 4rem;"></div>
                    <div style="display: inline-block;padding: 10px 10px 0px 10px;border-radius: 6px;background-color: ivory;">
                        <p class="text-center" style="margin-bottom: 0.3rem;">Hey Guys !</p>
                    </div>
                </div>
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

               <div style="display: flex;justify-items: center;width: 100%;height: auto;margin-bottom: 2rem;">
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
                </div> 
            </div>-->
          
          
            
            <div class="message" >
                    
                    <div v-for="msg in messages" :key="msg.msg.toString()" style="margin-bottom:0.5rem" class="message__container">
                     
                      <p
                        v-if="!msg.join && msg.msg.message.type=='text'"
                        class="message__text"
                        :class="{ own: msg.isMe, other: !msg.isMe}"
                        v-message="msg.msg"
                        style="max-width:330px;margin-left:10px"
                      ></p> 
                        <p 
                          v-if="!msg.join && msg.msg.message.type=='file' && msg.isMe"
                          class="message__joined"> 
                          You have sent a file Named: {{msg.msg.message.fileName.substring(0,20)}}</p>          

                      <p 
                        v-if="msg.join"
                        class="message__joined"> 
                        {{msg.msg}}</p>
                      
                    </div>
                     <!-- <span v-if="fileToSend!==undefined ||conference.shareFileInfo.shareFile" :class="{ own: msg.isMe, other: !msg.isMe}" >
                                                  msg.type=='text'? msg.msg:msg
                          <div  style="margin-bottom:1px;margin-left:10px; border:1px solid black;display: flex;justify-items: center;width:300px;height: auto;background-color:white;border-radius: 10px ;">
                                <div style=" display: flex;justify-content:center; align-items:center; width: 20%;height: auto;">
                                    <span class="rounded-circle" style="height:inherit;width:inherit;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1; ">
                                        <span class="rounded-circle" style="display: inline-block;width: 40px;height:40px;background-color: rgb(67,104,214);padding-top:10px;">
                                            
                                            <i class="fa fa-files-o" style="font-size: 20px;color: #ffffff;"></i>
                                            
                                        </span>
                                    </span>
                                    
                                </div>
                                <div style="width: 65%;height: auto;padding-left:1rem">
                                    <div style="width: 100%;height: auto;font-size:11px" >
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">fileName: <span style="font-weight:normal">{{conference.shareFileInfo.shareFile? ": "+conference.shareFileInfo.fileName: ": "+fileToSend.name}} </span></span> <br>
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Size: <span style="font-weight:normal">{{conference.shareFileInfo.shareFile? ": "+conference.shareFileInfo.fileSize:": "+fileToSend.size}} </span> </span ><br>
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Type:<span style="font-weight:normal" > {{conference.shareFileInfo.shareFile? ": "+conference.shareFileInfo.fileType:": "+fileToSend.type}} </span></span>
                                        
                                    </div>
                                </div>                                            
                          </div>                           
                      </span> -->

                   
                     
            </div>

        </div>
    
</template>
<script>
export default {
   
    name:"ChatAreaConference",
    props: {
    messages: Array,
    fileToSend:File,
    conference:Object,

  },data:()=>({
      chatContainer:"scrollableDiv",
      maxMessageLength:43,
      downloadElement:Object,
  }),
  directives: {
    message: {
      bind: function(el, binding, vnode) {
        const isObj = typeof binding.value === 'object'&& binding.value.username!==undefined
        let chunks
        const maxLength = vnode.context.maxMessageLength        

        if(isObj) {
          chunks = Math.ceil(binding.value.message.msg.length / maxLength)
           
          el.innerHTML = `<span style="font-weight:bold;width:100%;display:inline-block;text-align:left">${binding.value.username+' :'}</span>
            ${vnode.context.getChunkText(binding.value.message.msg, maxLength, chunks)}` 

        }else {
          
          chunks =Math.ceil(binding.value.message.msg.length /maxLength)       
           
          el.innerHTML = vnode.context.getChunkText(binding.value.message.msg, maxLength, chunks)
        }
      }
    }
  },
  mounted(){

    this.downloadElement=document.getElementById("download")

  },
  computed: {
    
    onlyText: function()  {

      
      return this.messages.filter(function (msg) {
            
             
             if(!msg.join && msg.msg.message.type=='text'){
               
               console.log("oiuyiuyt=kgdgfd====",msg)

              return msg
             }
      })

    }
  
  },
  methods: {
    getChunkText(message, maxLength, index){
      let newMessage= ''
      for(let i = 0; i < index; i++){
        const newChunk = message.slice(i*maxLength, maxLength*(i+1))
        if (i!==0) newMessage += '<br>'
        newMessage += `<span style="width:100%;display:inline-block;text-align:left"> ${newChunk} </span>`
      }
      return newMessage
    },
    displayFile(message,downloadElement){        

               return `<span>                
                             <div  style="margin-bottom:1px;margin-left:10px; border:1px solid black;display: flex;justify-items: center;width:300px;height: auto;background-color:white;border-radius: 10px ;">
                                  <div style=" display: flex;justify-content:center; align-items:center; width: 20%;height: auto;">
                                    <span class="rounded-circle" style="height:inherit;width:inherit;border: 4px solid #fff;display: inline-block;position: relative;z-index: 1; ">
                                        <span class="rounded-circle" style="display: inline-block;width: 40px;height:40px;background-color: rgb(67,104,214);padding-top:10px;">
                                            
                                            <i class="fa fa-files-o" style="font-size: 20px;color: #ffffff;"></i>
                                            
                                        </span>
                                    </span>
                                    
                                </div>
                                <div style="width: 65%;height: auto;padding-left:1rem">
                                    <div style="width: 100%;height: auto;font-size:11px" >
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">fileName: <span style="font-weight:normal">${message.fileName} </span></span> <br>
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Size: <span style="font-weight:normal">${message.fileSize} </span> </span ><br>
                                        <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Type:<span style="font-weight:normal" >${message.fileType} </span></span>
                                         <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Download:<span style="font-weight:normal" >${downloadElement} </span></span>
                                    </div>
                                </div>                                            
                          </div>                           
                      </span>          
                      
              </span>`

    },
  },
  watch: {
    messages: function(newValue){
      const chatArea = document.getElementsByClassName(this.chatContainer)[0]
      chatArea.scrollTop = chatArea.scrollHeight + 100

      console.log("=========document.getElementById(download)",document.getElementById("download"))
      console.log("user",this.messages.msg)
      
      newValue.forEach(element => {
          //console.log("000000000",element.msg)
          
          if(element.join==undefined && element.msg.message.type=='file'){

                console.log("===When type = file ====== document.getElementById(download)",document.getElementById("download"))
              //t=document.getElementById("download")
                this.downloadElement=document.getElementById("download")
               console.log("===When type == file ======",this.downloadElement)

          }

      });

    

      // console.log(")))))))",this.downloadElement)
      // document.getElementById("telecharger")!==null?document.getElementById("telecharger").appendChild(this.downloadElement):document.getElementById("telecharger")
      // console.log("=========document.getElementById(download)==============",document.getElementById("telecharger"))
    },
    // downloadElement:function(newvalue){

    //   if(newvalue==!undefined){
    //     document.getElementsByTagName("body").appendChild(this.downloadElement);
    //     console.log("=========document.getElementById(download)",document.getElementById("telecharger"))

    //   }
   // }

  }
    
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

    width: 100%;    
    display: inline-table;
  }

  .own {
    background: #0080001f;
    border: 1px solid #0080001f;
    margin: 0;    
  }

  .other {
    background: #d6ca002b;
    border: 1px solid #d6ca002b;
    margin: 0;
   
  }
}
</style>