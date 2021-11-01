
<template>
    <div  class="box">
        <div class="user_img">
            <a style="text-decoration:none" @click="toggleDropdown" class="profile">
                <img class="img-fluid rounded-circle" style="width:47px;height:47px " :src="this.imgProfile">
            </a>             
        
        </div>
        <div class="drp_box">
            <ul>
                <li @click="changeScreen('Profile')">
                    <i class="icon-signout" ></i>
                    <a>Mon Profile</a>
                </li> 
                <li v-if="'Admin'=='Admin'" @click="changeScreen('AdminPage')">
                    <i class="icon-signout" ></i>
                    <a >Administrer</a>
                </li> 


                <li @click="logout()" >
                    <i class="icon-signout" ></i>
                    <a >Logout</a>
                </li> 

                             
            </ul>
        </div>

    </div>


</template>

<script>
// ADMIN
// <li v-if="user.role==admin" @click="changeScreen('Admin')">
//       <i class="icon-signout" aria-hidden="true"></i>
//       <a >Logout</a>
// </li>  


var JQuery=require("jquery")
window.JQuery=JQuery;
window.$=JQuery;


export default {
    name:"DropDown",
     props:{

       imgProfile:String
   },
    methods: {
            toggleDropdown () {

                JQuery(document).ready(function($){            
                        console.log("DropDown")
                        $('.drp_box').toggleClass("open")                          
               
                })
                
            },
            changeScreen(screenName){
                this.$emit("changeScreen",screenName)
            },
            logout(){
                this.$emit("logout")
            }
            
        }

}
</script>

<style lang="css" scoped>


.drp_box{
    position: relative;
    margin:0 auto;
    padding: 10px 15px;
    width:300px;
    background-color: rgb(208, 222, 246);
    display: flex;
    justify-content: center;
    margin-top: 58px;
    visibility: hidden;
    opacity: 0;
    transition:.5s
}

.drp_box.open{

    visibility: visible;
    opacity: 1;
    margin-top: 0;
}

.drp_box::before{

content:"";
position: absolute;
top:-5px;
left: 45%;
width: 10px;
height: 10px;
background-color:transparent ;
border-top:10px solid #fff;
border-right:10px solid #fff;
transform: rotate(-45deg);

}


.drp_box ul{

    padding-left:0;
}
.drp_box ul li{

    list-style-type:none ;
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

a{
    text-decoration: none;
    transition:-5px;
    color:#000
}

a:hover{

    color: #fff;
}


</style>