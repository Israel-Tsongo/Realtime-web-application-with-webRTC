

<template>
    

<div id="content" >

<div class="container-fluid">
        <section style="margin-top: 11rem;height: 30rem;display: flex;justify-content: center;align-items: center;">
            <div style="width: 60rem;height: 25rem;">
                <div class="row" >
  
                    <div class="col-xl-12">
                        <div class="card" style="padding-left: 3rem;padding-right: 3rem;">
                            <div class="card-body" style="height: 25rem;">
                                <div class="row">
                                    <div class="col-xl-3">
                                        <div style="height: 22rem;width: 100%;display: flex;justify-content: center;align-items: center;">
                                            <div style="width: 200px;height: auto;">
                                                <span class="text-center rounded-circle" style="display: inline-block;width: 161px;height: 161px;border: 5px solid rgb(78,115,223);">
                                                    <span class="rounded-circle" style="display: inline-block;width: 150px;height: 150px;">
                                                        <img alt="content-img" class="rounded-circle" :src="imageProfile" style="width: inherit;height: inherit; background-size:cover;background-repeat: no-repeat;background-position: center;">
                                                    </span>
                                                </span>
                                                <div style="width:100% ;display:flex; justify-content:center">
                                                    <div style="height:130px;width:60%;text-align: center;margin-top: 2rem; border:1px solid black,display:flex; align-content:center">
                                                       
                                                        <input name="image" ref="imgFile" style="visibility:hidden" @change="onSelect()" type="file" >                                                                
                                                        <button class="btn btn-primary" type="button" @click="chooseFile()" style="border-radius: 10px;font-weight: 800;font-family: cursive;">Changer</button>
                                                        <button class="btn btn-primary" type="button" @click="saveImage()" style=" margin-top:0.5rem;border-radius: 10px;font-weight: 800;font-family: cursive;">Save</button>
                                                       
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-9">
                                        <h4 class="text-center" style="margin-bottom: 2rem;">Information personnel</h4>
                                        <div class="row">
                                            <div class="col">
                                                
                                                    <div class="form-row">
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="nom"><strong>Nom</strong></label>
                                                                <input v-model="nom" id="nom" class="form-control" type="text"   style="border-radius:10px;">
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="email"><strong>Adresse mail</strong><br></label>
                                                                <input v-model="email" id="email" class="form-control" type="email"   style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-row">
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="service"><strong>Service</strong><br></label>
                                                                <input v-model="service" id="service" class="form-control" type="text"  style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="form-group text-left">
                                                                <label for="fonction"><strong>Fonction</strong><br></label>
                                                                <input v-model="fonction" id="fonction" class="form-control" type="text"  style="border-radius: 10px;">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="form-group" style="text-align: center;margin-top: 2rem;">
                                                        <button @click="submitInfo()" class="btn btn-primary btn-sm" type="submit"  style="height: 50px;width: 100px;border-radius: 10px;font-weight: 800;font-family: cursive;">Modifier</button>
                                                    </div>
                                               
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
     
     data:()=>({

         
             nom:"",
             email:"",
             service:"",
             fonction:"",
             imageProfile:"",
             file:"",
             message:""
         }),
     
     async mounted(){
            //
            
            
            this.getData()
            this.getImage()

           },
     methods:{
         chooseFile(){
             this.$refs.imgFile.click()            

         },

       

         onSelect(){
            
             const file = this.$refs.imgFile.files[0];
             this.file=file;
             
         },
         async saveImage(){


             const formData=new FormData()
             formData.append("image",this.file)
             formData.append("matricule",this.$store.state.matricule)

             try{
                 console.log("Save image",)
                 await axios.post(`${url}/profile/image`,formData).then(()=>{

                   
                        this.getImage()
                     
                 }).catch((err)=>{
                     console.log("err",err.data);
                 })
                 this.message="Uploaded"
                
             }catch(err){
               console.log(err)
               this.message= "something went wrong"
             }
             this.getImage() 
            this.$emit("UpdateImageProfile",)

             
         },
         async submitInfo(){
               
               await axios.post(`${url}/profile/userUpdate`,{matricule:this.$store.state.matricule, nom:this.nom, email:this.email, fonction:this.fonction, service:this.service})
               this.getData()

         },
         async getImage(){

                console.log("Get Image called")
                this.imageProfile= await `${url}/profile/image?matricule=${this.$store.state.matricule}&&t=${+new Date().getTime()}`
                this.$emit("changeImageProfile")
         },
         async getData(){
             

            await axios.get(`${url}/profile/user?matricule=${this.$store.state.matricule}`).then((response)=>{
                
                 this.nom=response.data.nom
                 this.email=response.data.email
                 this.service=response.data.service
                 this.fonction=response.data.fonction
             
             })
             
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
