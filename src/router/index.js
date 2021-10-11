import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import VueToastr from "vue-toastr"
import Login from './../components/Login'
import ChatMsg from './../components/chatMessages/Message.vue'

import Chat from './../views/Chat.vue'
import Home from './../views/Home.vue'
import Profile from './../views/Profile.vue'
import store from '../store'


Vue.use(VueMaterial)
Vue.use(VueToastr, {
  defaultPosition: "toast-top-left",
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
})
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      //./../components/Login
      // beforeEnter: (to, from, next) => {
      //    next("/home")
      // }
      
    },
    {
      path: '/chatMessage',
      name: 'chatMessage',
      component: ChatMsg,
      // beforeEnter: (to, from, next) => {
       // store.state.room && store.state.username ? next('/chat') : next()
     // }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      // beforeEnter: (to, from, next) => {
       // store.state.room && store.state.username ? next('/chat') : next()
     // }
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Chat,
      beforeEnter: (thisRoute, redirectTo, next) => {

         !store.state.room && !store.state.username ? next('/home') : next()
        
      }
    } ,
     {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Profile,
      
    }     
    
    
  ]
})
