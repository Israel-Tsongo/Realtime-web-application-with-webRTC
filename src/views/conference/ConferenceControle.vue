<template>
    <div style="height: 4.2rem;opacity: 0.98;border-radius: 20px;background: rgba(69,107,216,0.3);">
        <div class="row no-gutters justify-content-center align-items-center">
            <div class="col-xl-4" style="padding-left: 5rem;">
                <div class="input-field" style="width: 132px;height: 50px;display: flex;align-items: center;border: 3px solid #fff;">
                    <span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;width: 34px;height: 42px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" fill="none" class="rounded-circle" style="width: 46px;height: 27px;background: #79ace8;box-shadow: 0px 0px 9px 2px;opacity: 0.72;color: rgb(23,47,227);">

                            <path d="M13 6C13 7.65685 11.6569 9 10 9C8.34315 9 7 7.65685 7 6C7 4.34315 8.34315 3 10 3C11.6569 3 13 4.34315 13 6Z" fill="currentColor"></path>
                            <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="currentColor"></path>
                            <path d="M14 15C14 12.7909 12.2091 11 10 11C7.79086 11 6 12.7909 6 15V18H14V15Z" fill="currentColor"></path>
                            <path d="M6 8C6 9.10457 5.10457 10 4 10C2.89543 10 2 9.10457 2 8C2 6.89543 2.89543 6 4 6C5.10457 6 6 6.89543 6 8Z" fill="currentColor"></path>
                            <path d="M16 18V15C16 13.9459 15.7282 12.9552 15.2507 12.0943C15.4902 12.0327 15.7413 12 16 12C17.6569 12 19 13.3431 19 15V18H16Z" fill="currentColor"></path>
                            <path d="M4.74926 12.0943C4.27185 12.9552 4 13.9459 4 15V18H1V15C1 13.3431 2.34315 12 4 12C4.25871 12 4.50977 12.0327 4.74926 12.0943Z" fill="currentColor"></path>
                        </svg>
                    </span>
                    <select style="width: 55px;margin-left: 18px;margin-bottom: 4px;">
                        <optgroup label="Number">
                            <option value="" selected="">2</option>
                            <option value="">3</option>
                            <option value="14" selected="">4</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="col-xl-4 d-xl-flex justify-content-xl-center align-items-xl-center" style="height: 70px;">
                <div style="height: 50px;width: 16rem;">
                    <span style="display: inline-block;margin-right: 0.7rem;margin-top: 5px;padding-top: 5px;font-size: 22px;color: rgba(255,255,255,0.83);">Affichage :&nbsp;
                    </span>
                    <button  @click="displayType('MultiVideoConference')"  class="btn" type="button" style="margin-left: 0.8rem;height: 32px;border: 1px solid #fff;padding-top: 3px;padding-bottom: 3px;background: rgb(157,185,218);">
                        <i class="fas fa-table" style="color: white;"></i>
                    </button>
                    <button @click="displayType('MonoVideoConference')" class="btn" type="button" style="height: 32px;padding-top: 3px;border: 1px solid #fff;padding-bottom: 3px;background: #9bb8da;">
                        <i class="fas fa-square" style="color: white;"></i>
                    </button>
                    
                </div>
            </div>
            <div class="col d-xl-flex justify-content-xl-center align-items-xl-center">
                <div v-if="conference.admin"  :disabled="peersLength === 2 || users.length === 1" class="input-field" style="width: 144px;height: 50px;display: flex;align-items: center;border: 3px solid #fff;">
                        <span class="d-flex justify-content-center align-items-center" style="margin-left: 10px;height: 56px;width: 35px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" class="rounded-circle" style="background: #79ace8;box-shadow: 0px 0px 9px 2px;opacity: 0.72;width: 55px;height: 27px;color: rgb(35,58,234);">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"></path>
                                <path d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z" fill="currentColor"></path>
                                <path d="M18 7H20V9H22V11H20V13H18V11H16V9H18V7Z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <select v-for="user in users" :key="user.username" style="margin-left: 17px;width: 73px;" name="iuoi" value="oioi">
                        
                            <option  
                                v-if="user.username !== $store.state.username && !peers[user.username]" 
                                @click="invitate(user.username)" > 
                                <md-icon>person_add</md-icon> {{user.username}}                            
                            </option>                            

                        </select>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ConferenceControle",
    props:{
        users:Array,
        conference:Object,
        peersLength:Number

    },
    methods:{

        invitate(user){

          this.$emit("invitation",user)
        },

        displayType(typeOfDisplay){

          this.$emit("displayType",typeOfDisplay)
        }
    }
    
}

</script>
<style>

</style>