
<template>
    
    <div class="loginContainer">      

        <div class="forms-loginContainer">
        <div class="signin-signup">
          <form  class="sign-in-form" @submit.prevent="submitFormLogin" >
            <h2 class="title">Sign in</h2>

            <div class="input-field-login">
              <i class="fas fa-user"></i>
              <input type="text" v-model="nomLog" placeholder="Email" />
            </div>
            <div class="input-field-login">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="passwordLog" placeholder="Password" />
            </div>

             <div v-if="errorSignIn" class="options-error">
                  <p>{{errorSignIn}}</p>
            </div>

            <input type="submit" value="Login"  class="loginBtn solid" />
            
            <!--<p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>-->
          </form>
          <form  class="sign-up-form" @submit.prevent="submitFormSignUp()" >
            <h2 class="title">Sign up</h2>
            <div class="input-field-login">
              <i class="fas fa-user"></i>
              <input type="text" v-model="nom" placeholder="Nom" />
            </div>
            <div class="input-field-login">
              <i class="fas fa-envelope"></i>
              <input type="email" v-model="email" placeholder="Email" />
            </div>
            <div class="input-field-login">
              <i class="fas fa-user"></i>
             <!-- <select  v-model="service" >
                <option value="" disabled selected hidden >Service</option>                 
                <option>Administration</option>
                <option>Technique</option>
                <option>Humaine</option>              
              </select> -->
              <input type="text" v-model="service"  placeholder="Service" /> 
            </div>

           <div class="input-field-login">
              <i class="fas fa-user"  ></i>
              <!-- <select v-model="fonction">
                <option value="" disabled selected hidden >Fonction</option>
                <option>chef</option>
                <option>sous chef</option>
                <option>-----</option>              
              </select> -->
              <input type="text" v-model="fonction"  placeholder="Fonction" /> 
            </div>

            <div class="input-field-login">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="password" placeholder="Password" />
            </div>
            <div class="input-field-login">
              <i class="fas fa-lock"></i>
              <input type="password" v-model="passwordConfirm" placeholder="Confirmez votre Password" />
            </div>

              <div v-if="errorSignUp" class="options-error">
                  <p>{{errorSignUp}}</p>
              </div>

            <input type="submit" class="loginBtn" value="Sign up" />



            <!--<p class="social-text">Or Sign up with social platforms</p>

            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div> -->

          </form>
        </div>
      </div>

      <div class="panels-loginContainer">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>
              Si vous etes nouveau veillez vous inscrire dans le systeme 
              en cliquant sur le bouton ci bas.
            </p>
            <button class="loginBtn transparent" v-on:click="signUpEvent()" id="sign-up-loginBtn">
              Sign up 
            </button>
          </div>
          <img src="../assets/img/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>One of us ?</h3>
            <p>
              Si vous ete deja inscri dans le systeme, vous allez juste vous loguer.
              Veillez alors  cliquer  le bouton ci bas.
            </p>
            <button class="loginBtn transparent" id="sign-in-loginBtn" v-on:click="signInEvent()">
              Sign in
            </button>
          </div>
          <img src="../assets/img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>


</template>

<script>


import { STORE_ACTIONS } from "./../utils/config"

export default {
  name:"Login",
  data: () => ({
    // Field for Sign up
    nom: undefined,
    email:undefined,
    service:undefined,
    fonction:undefined,
    password:undefined,
    passwordConfirm:undefined,
    // Field for Login
    nomLog:undefined,
    passwordLog:undefined,
    // Errors
    errorSignIn: undefined,
    errorSignUp:undefined,
    defaultError: 'Something went wrong' 
  }),
  
   methods:{

    signUpEvent(){
       
          const loginContainer=document.querySelector(".loginContainer");       
          loginContainer.classList.add("sign-up-mode");
      
     },
     signInEvent(){
   
          const loginContainer = document.querySelector(".loginContainer");      
          loginContainer.classList.remove("sign-up-mode");
    
     },
     async submitFormSignUp() {
      if(!(this.nom && this.email && this.service && this.fonction && this.password && this.passwordConfirm)) return
      this.errorUp = undefined
      
      try {
        await this.$store.dispatch(STORE_ACTIONS.signUp, {
          nom: this.nom,
          email: this.email,
          service:this.service,
          fonction:this.fonction,
          password:this.password,
          passwordConfirm:this.passwordConfirm
        })
        this.$router.go(this.$router.currentRoute)
        
      } catch (error) {
        this.errorSignUp = error.message ? error.message : this.defaultError
      }    
  },
     async submitFormLogin() {
        if(!(this.nomLog && this.passwordLog)) return
        this.errorSignIn = undefined
        
        try {
          console.log("####")
            await this.$store.dispatch(STORE_ACTIONS.signIn, {
              nomLog: this.nomLog,
              passwordLog: this.passwordLog
            })
             console.log("++++")
            await this.$store.dispatch(STORE_ACTIONS.joinRoom, {
            room: 'GENERAL_SCOPE',
            username: undefined
            })
             console.log("===")
            this.$socket.open()

            this.$router.push({name:"chatMessage"})
              //this.$socket.open()
        } catch (error) {
              this.errorSignIn = error.message ? error.message : this.defaultError
         }    
      },

      }    
}

</script>
<style lang="css" scoped>
  @import './chatMessages/assets/css/loginStyle.css';
</style>


