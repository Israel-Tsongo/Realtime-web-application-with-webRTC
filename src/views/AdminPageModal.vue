
<template>
 <div class="card"   id="card-id" style="height: auto;">
            <div class="card-body" id="main-card-body">
                <div id="div-after-card-body">
                    <div id="input-div" class="p-5" style="padding: 0px;padding-top: 0px;padding-right: 0px;padding-bottom: 0px;padding-left: 0px;">
                        <div class="text-center" id="main-div">
                            <h4 class="text-dark mb-4">Modifier les d'un utilistaeur</h4>
                        </div>
                        <form id="main-form" class="user">
                            <div class="form-group row all-forms">
                                <div class="col-auto col-sm-6 d-flex justify-content-end mb-3 mb-sm-0 all-col-left" style="padding-left: 0px;padding-right: 0px;">
                                    <input type="text" class="form-control form-control-user-left" v-model="nom" id="nom" placeholder="Nom" name="nom" />
                                </div>
                                <div class="col-auto col-sm-6 all-col-right" style="padding-right: 0px;padding-left: 0px;">
                                    <input type="text" class="form-control form-control-user-right" v-model="email" id="email" placeholder="Email" name="email" />
                                </div>
                            </div>
                            <div class="form-group row all-forms" style="width: 525px;">
                                <div class="col-auto col-sm-6 d-flex justify-content-end mb-3 mb-sm-0 all-col-left" style="padding-left: 0px;padding-right: 0px;width: 327px;">
                                    <input type="text" class="form-control form-control-user-left"  v-model="service" id="service" placeholder="Service" name="service" />
                                </div>
                                <div class="col-sm-6 all-col all-col-right" style="padding-right: 0px;padding-left: 0px;">
                                    <input type="text" class="form-control form-control-user-right" v-model="fonction" id="fonction" placeholder="Fonction" name="fonction" />
                                </div>
                            </div>
                            <div class="form-group row all-forms">
                                <div class="col-auto col-sm-6 d-flex justify-content-end mb-3 mb-sm-0 all-col-left" style="padding-right: 0px;padding-left: 0px;">
                                    <input type="text" class="form-control form-control-user-left" v-model="password" id="password" placeholder="Mot de passe" name="password" />
                                </div>
                                <div class="col-sm-6 all-col all-col-right" style="padding-left: 0px;">
                                    <input type="text" class="form-control form-control-user-right" v-model="statut" id="statut" placeholder="Statut" name="statut" />
                                </div>
                            </div>
                        </form>
                        <div class="text-center" id="div-button">
                            <div class="form-group d-flex flex-column align-items-center" id="form-btn">
                                <button class="btn btn-primary btn-block text-white btn-user btn-save" type="submit" @click="updateUser">Mettre a jour</button>
                                <button class="btn btn-primary btn-block text-white btn-user btn-close" type="submit" @click="close" data-dismiss="modal">Annuler</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div> 

</template>
<script>
import axios from "axios"
import {url} from "./../utils/config"
var JQuery=require("jquery")
  window.JQuery=JQuery;
  window.$=JQuery;

export default {

    name:"AdminPageModal",
    props:{
        selectedUser:Object
        
    },
    data(){

        return{

            nom:this.selectedUser.nom,
            email:this.selectedUser.email,
            service:this.selectedUser.service,
            fonction:this.selectedUser,
            password:this.selectedUser.password,
            statut:this.selectedUser.password,

        }

    },

    
   async  created(){
        
       this.init()
    },
    methods:{
         init(){           
                  
             this.$nextTick(function(){
                   
                // document.querySelector('#nom').value=this.selectedUser.nom
                // document.querySelector('#email').value=this.selectedUser.email
                // document.querySelector('#service').value=this.selectedUser.service
                // document.querySelector('#fonction').value=this.selectedUser.fonction
                // document.querySelector('#password').value=this.selectedUser.password
                // document.querySelector('#statut').value=this.selectedUser.status                             
                
                
             })
            
            

         },
        async updateUser(){

           await axios.post(`${url}/users/update`,{   
                                                id:this.selectedUser._id,
                                                nom:this.nom,email:this.email,
                                                service:this.service,fonction:this.fonction,
                                                password:this.password,statut:this.statut,
                                                }).then((response)=>{
                                                    console.log(response)
                                                    this.$emit("close-modal")
                                                }).catch(function(error){

                                                    console.log(error);
                                                })
                                                

      },
      close(){

          this.$emit("close-modal")
      }




    }
}

</script>
<style>
</style>