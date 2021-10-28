

<template>
    

<div id="content" >

<div class="container-fluid">
        <section style="margin-top: 11rem;height: 30rem;display: flex;justify-content: center;align-items: center;">
            <div style="width: 60rem;height: 25rem;">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card" style="padding-left: 3rem;padding-right: 3rem;">
                            <div class="card-body" style="height: 25rem;">
                                <div class="row">
                                    <div class="col-xl-3">
                                        <div style="height: 22rem;width: 100%;display: flex;justify-content: center;align-items: center;">
                                            <div style="width: 200px;height: auto;">
                                                <span class="text-center rounded-circle" style="display: inline-block;width: 161px;height: 161px;border: 5px solid rgb(78,115,223);">
                                                    <span class="rounded-circle" style="display: inline-block;width: 150px;height: 150px;">
                                                        <img alt="content-img" class="rounded-circle" :src="this.imageProfile" style="width: inherit;height: inherit;">
                                                    </span>
                                                </span>
                                                <div style="height: 40px;width: 100%;text-align: center;margin-top: 2rem;">
                                                    
                                                    <!--<form  @submit.prevent="onSubmit()"  enctype="multipart/form-data" >-->

                                                            <input name="image" ref="imgFile" style="visibility:hidden" @change="onSelect()" type="file" >
                                                            
                                                            <button class="btn btn-primary" type="button" @click="chooseFile()" style="border-radius: 10px;font-weight: 800;font-family: cursive;">Changer</button>
                                                    <!--</form>-->
                                                    <h5>{{this.message}}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-9">
                                        <h4 class="text-center" style="margin-bottom: 2rem;">Information personnel</h4>
                                        <div class="row">
                                            <div class="col">
                                                <form @submit.prevent="submitInfo()" >
                                                    <div class="form-row">
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="nom"><strong>Nom</strong></label>
                                                                <input id="nom" class="form-control" type="text" placeholder="Israel Tsongo" name="nom" style="border-radius:10px;">
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="email"><strong>Adresse mail</strong><br></label>
                                                                <input id="email" class="form-control" type="email" placeholder="user@example.com" name="email" style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="service"><strong>Service</strong><br></label>
                                                                <input id="service" class="form-control" type="text" placeholder="Academique" name="service" style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="fonction"><strong>Fonction</strong><br></label>
                                                                <input id="fonction" class="form-control" type="text" placeholder="Secretaire Generale" name="fonction" style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group" style="text-align: center;margin-top: 2rem;">
                                                        <button class="btn btn-primary btn-sm" type="submit"  style="height: 50px;width: 200px;border-radius: 10px;font-weight: 800;font-family: cursive;">Changer vos informations</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
  

</template> 

<script >
//@submit.prevent="onSubmit()"
//ref="imgFile" @change="onSelect()

import {url} from "./../utils/config"
import axios from "axios"


   export default{
     name:"Profile",
     
     data(){

         return{
             imageProfile:null,
             file:"",
             message:""
         }
     },
     async created(){

            await this.getImage()
      
     },
     methods:{
         chooseFile(){
             this.$refs.imgFile.click()
             

         },

         async getImage(){
           // return  await axios.get(`${url}/profile/image`).then((response)=>{this.imageProfile=respense.date})
           this.imageProfile= await `http://localhost:3000/profile/image?matricule=${this.$state.matricule.matricule}`

         },

         onSelect(){
            
             const file = this.$refs.imgFile.files[0];
             this.file=file;
             this.onSubmit()
         },
         async onSubmit(){


             const formData=new FormData()
             formData.append("image",this.file)
             try{
                 await axios.post(`${url}/profile`,formData)
                 this.message="Uploaded"
             }catch(err){
               console.log(err)
               this.message= "something went wrong"
             }
             this.getImage()
         }


     },
     
    //  watch:{
    //       file:fucntion(){


    //       }



     
   
   }
   
</script >
   
<style lang="css">

    @import './chatMessages/assets/fonts/material-icons.min.css';
    @import './chatMessages/assets/css/styles.css';
    @import './chatMessages/assets/fonts/material-icons.min.css';
    @import './chatMessages/assets/fonts/ionicons.min.css';
    @import './chatMessages/assets/fonts/font-awesome.min.css';
    @import './chatMessages/assets/fonts/fontawesome-all.min.css';
    @import './chatMessages/assets/fonts/fontawesome5-overrides.min.css';
    @import './chatMessages/assets/bootstrap/css/bootstrap.min.css';  
   
</style>
