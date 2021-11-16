

<template>


<div id="content">
   
    <div class="container-fluid" style="margin-top: 7rem;">
      <section id="main-section-profile" style="/*height: 80vh;*//*width: 100%;*/">
        <div style="width: 93rem;">
            <div class="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 class="text-dark mb-0" id="membre-title">Gerer tout les profiles</h3>
            </div>
            <div class="row" style="display: flex;justify-content:center;">
                <div class="col-xl-10">
                    <div class="card shadow mb-12" id="card-center">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h6 class="text-primary font-weight-bold m-0">Gerer les profiles des personnels</h6>
                            <div class="dropdown no-arrow">
                                <button class="btn btn-link btn-sm dropdown-toggle" aria-expanded="false" data-toggle="dropdown" type="button">
                                    <i class="fas fa-ellipsis-v text-gray-400"></i>
                                </button>
                                <div class="dropdown-menu shadow dropdown-menu-right animated--fade-in">
                                    <p class="text-center dropdown-header">dropdown header:</p>
                                        <a class="dropdown-item" href="#">&nbsp;Action</a>
                                        <a class="dropdown-item" href="#">&nbsp;Une autre action</a>
                                    <div class="dropdown-divider">
                                    </div>
                                    <a class="dropdown-item" href="#">Quelque chose d'autre ?</a>
                                </div>
                            </div>
                        </div>
                        <div class="jumbotron jumbot" style="height: -100px;padding: 3px;"></div>
                        <div class="card-body" id="card-member" style="margin: 0px;padding: 10px;">
                            <div class="row" id="search-row">
                                <div class="col-md-6 text-nowrap" style="display:flex">
                                    <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable">
                                            <label>Show&nbsp;
                                                <select class="form-control form-control-sm custom-select custom-select-sm">
                                                    <option value="10" selected="">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>&nbsp;
                                            </label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="text-md-right dataTables_filter" id="dataTable_filter"><label><input type="search" class="form-control form-control-sm" aria-controls="dataTable" placeholder="Search"></label></div>
                                </div>
                            </div>
                            <div class="table-responsive" id="table-member">
                                <table class="table">
                                    <thead>
                                        <tr id="tab-header">
                                            <th style="width: 0px;padding: 0px;padding-top: 0px;font-size: 0px;height: 87px;"></th>
                                            <th style="text-align:left">Nom</th>
                                            <th style="text-align:left">Email</th>
                                            <th style="text-align:left">Matricule</th>
                                            <th style="text-align:left">Service</th>
                                            <th style="text-align:left">Fonction</th>
                                            <th style="text-align:left">Password</th>
                                            <th style="text-align:left">Status</th>
                                            <th style="text-align:left">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in users" :key="user.id">
                                            <td class="text-center" style="width: 36.8px;padding: 12px;font-size: 16px;border-width: 2px;">
                                               <input name="userValue" @click="clickRadioBtn()" type="radio" :value="user._id" style="margin-top: 0px;">
                                            </td>
                                            <td style="text-align:left">{{user.nom}}</td>
                                            <td style="text-align:left">{{user.email}}</td>
                                            <td style="text-align:left">{{user.matricule}}</td>
                                            <td style="text-align:left">{{user.service}}</td>
                                            <td style="text-align:left">{{user.fonction}}</td>
                                            <td style="text-align:left">{{user.password.substring(0,10)+"..."}}</td>
                                            <td style="text-align:left">{{user.status}}</td>
                                            <td style="text-align:left">{{user.role}}</td>
                                            
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div class="jumbotron jumbot"></div>
                        </div>
                    </div>
                    <div class="card shadow mb-12" id="card-center-1">
                        <div id="div-total"></div>
                        <div class="card-body" id="card-bottom-body">
                            <div class="row">
                                <div class="col-md-6 align-text-left">
                                    <p id="dataTable_info" style="text-align:left" class="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                                </div>
                                <div class="col-md-6">
                                    <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers" id="pagination">
                                        <ul class="pagination">
                                            <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="btn-group-fab"  @click="openFab" role="group" aria-label="FAB Menu" >
                <div>
                    <button type="button"  class="btn btn-main btn-primary has-tooltip" data-placement="left" title="Menu"><i class="fa fa-bars"></i></button>
                    <!--<button type="button" data-toggle="modal" data-target="#manageUser" class="btn btn-sub btn-info has-tooltip" data-placement="left" title="Ajouter"><i class="fa fa-plus"></i></button>-->
                    
                    <button type="button"  data-toggle="modal" @click="updateOrDelete('update')" class="btn btn-sub btn-danger has-tooltip" data-placement="left" title="Metre a jour"><i class="fa fa-refresh"></i></button>

                    <button type="button" class="btn btn-sub btn-warning has-tooltip" @click="updateOrDelete('delete')" data-placement="left" title="Supprimer"><i class="fa fa-remove"></i></button>
                </div>
            </div> 
             

             <div class="modal fade show"  id="manageUser" role="dialog" tabindex="-1">
                <div id="modal-id" style="max-width:580px;" class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title"> </h4>
                        </div>
                        
                        <div class="modal-body">
                         <AdminPageModal @reloadData="init()" v-if="callModal" v-bind:selectedUser="this.selectedUser" @close-modal="closeModal()"></AdminPageModal>
                        </div>

                        <div  class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>


        </section>
    </div>
</div>




</template>


<script>
import {url} from "../../utils/config"
import axios from "axios"

import AdminPageModal from "./AdminPageModal"

var JQuery=require("jquery")
  window.JQuery=JQuery;
  window.$=JQuery;
export default {

  name:"adminPage",
  components:{AdminPageModal},
  data:function(){

      return {
          users:[],
          userId:Object,
          selectedUser:{},
          callModal:false
      }
  },
  mounted(){
    
       this.init()
    

  },

  methods:{
      async  init(){
          console.log("Init in admin function")
           const userList = await axios.get(`${url}/admin/userList`)
            this.users=userList.data  
      },
      clickRadioBtn(){


         
            this.userId=document.querySelector('input[name="userValue"]:checked').value; 
                        
                const keys= Object.keys(this.users)
                 keys.forEach((key) => {

                    if(this.users[key]._id==this.userId){

                        this.selectedUser=this.users[key]
                    }                    
                });           
        
             },
      openFab(){      
         
           JQuery(document).ready(function($){       

                $('.btn-group-fab').unbind().toggleClass('active');               
                $('.has-tooltip').tooltip();    
        
        });
 

      },
      closeModal(){

          JQuery(document).ready(function($){ 

                    $("#manageUser").hide()
        
        });

      },
      async updateOrDelete(type){

          if(type==="update"){
              this.callModal=true

              JQuery(document).ready(function($){ 
                   
                   $("#manageUser").show()                   

              });

          }else if(type==="delete"){

                axios.post(`${url}/admin/users/delete`,{id:this.userId})
                this.init()

          }


      },

      
      delete(){
            // await axios.get(`${url}/users`)
      }

  }

} 


</script>

<style>

</style>