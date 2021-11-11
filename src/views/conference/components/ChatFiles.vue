<template>

<div style="padding-bottom:1rem;height: 80%;padding-left: 0.2rem;overflow-y:scroll;overflow-x:hidden">

    <div v-for="(msg,index) in onlyFiles" :key="msg.msg.toString()" class="message__container">         
                 
        <p 
        v-if="!msg.join && msg.msg.message.type=='file' && !msg.isMe "       
        class="message__text other"
               
        style="max-width:330px;margin-left:10px;margin-top:10px">         
            <span>                
                <div  style="margin-bottom:1px;margin-left:10px; display: flex;justify-items: center;width:300px;height: auto;">
                    <div style=" display: flex;justify-content:center; align-items:center; width: 20%;height: auto;">
                        <span class="rounded-circle" style="height:inherit;width:inherit;display: inline-block;position: relative;z-index: 1; ">
                            <span class="rounded-circle" style="display: inline-block;width: 40px;height:40px;background-color: rgb(67,104,214);padding-top:10px;">                        
                                <i class="fa fa-files-o" style="font-size: 20px;color: #ffffff;"></i>                        
                            </span>
                        </span>                
                    </div>
                    <div style="width: 65%;height: auto;padding-left:1rem">
                        <div style="width: 100%;height: auto;font-size:11px" >

                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">fileName: <span style="font-weight:normal">{{msg.msg.message.fileName}}</span></span> <br>
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Size: <span style="font-weight:normal">{{(msg.msg.message.fileSize/1048576).toString().substring(0,5)+' MB'}} </span> </span ><br>
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Type:<span style="font-weight:normal" >{{msg.msg.message.fileType}} </span></span>
                            <span style="display:inline-block;margin-left:5px;width:100%; text-align:left;font-weight:800">Download:<span style="font-weight:normal"><a id="download" :download="downloadAnchor !== undefined ? downloadArray[index].download:''" :href="downloadAnchor !== undefined ? downloadArray[index].href:'' ">{{downloadAnchor !== undefined ? downloadArray[index].textContent.substring(0,50):''}} </a></span></span>
                           
                        </div>
                    </div>                                            
                </div>                           
            </span> 

        </p>
        <p 
          v-if="msg.join"
          class="message__joined"> 
          {{msg.msg}}</p>  

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
    downloadAnchor:Object
  },data:()=>({
      chatContainer:"scrollableDiv",
      maxMessageLength:43,
      downloadArray:[]
      
  }),
 
  computed: {
    
    onlyFiles: function()  {

      
      return this.messages.filter(function (msg) {
             console.log("++++=====,Looking  for is me",msg)
             if(!msg.join && msg.msg.message.type=='file'){              
               
              return msg

             }
      })

    },
   
  
  },
  
  watch:{

    downloadAnchor:function(newValue,oldValue){

        console.log("0999080################NewValue#############80989687867",newValue)
         console.log("0999080#################OldValue############80989687867",oldValue)


       if(newValue && newValue!==oldValue){
             
                   
                   this.downloadArray.push({...newValue})
                   this.$toastr.w("New file saved")
                   console.log("array==========",this.downloadArray)
             

      }
  }
    
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

  
}
.other {
    background: #d6ca002b;
    border: 1px solid #d6ca002b;
    margin: 0;
   
  }
</style>