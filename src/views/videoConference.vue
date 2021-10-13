
<template>
<div id="content">
    <Navbar></Navbar>
    <div class="container-fluid" style="/*padding-left: 0.8rem;*//*padding-right: 0.8rem;*/">
        <div style="height: 64rem;width: 100%;display: flex;align-items: center;justify-content: center;position: relative;">
            <div style="height: 55rem;width: 53rem;display: inline-block;padding-right: 0.5rem;margin-right: 2rem;margin-top: -7rem;">
           
            
           
           
                
                <chat-conference></chat-conference>
                <div style="height: 220px;width: 50px;align-items: flex-end;position: absolute;background: rgba(103,138,226,0.49);border-radius: 30px;bottom: 20%;left: 2%;"><input type="range" style="position: relative;width: 153px;height: 65px;bottom: -26%;left: -105%;transform: rotateZ(-90deg);">
                    <div class="input-field" style="height: auto;position: absolute;bottom: 3%;left: 3%;"><span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;"><i class="fa fa-volume-up rounded-circle" style="background: #f8fafd;color: rgb(0,0,0);opacity: 0.72;"></i></span></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Navbar from '../components/chatMessages/OtherComponents/Navbar.vue'
export default {
    name:"VideoConference",
    components:{
        Navbar
    }
    
}
</script>
<style
Navbar scoped>

</style>