import Vue from 'vue'
import Router from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import VueToastr from "vue-toastr"
import Login from './../views/Login'
import Chat from './../views/Chat.vue'
import AdminPage from './../views/admin/AdminPage.vue'
//import Home from './../views/Home.vue'
import Conference from './../views/conference/VideoConference.vue'
import MeetingList from './../views/MeetingList.vue'
import MainChat from './../views/MainChat.vue'
import HomeApp from './../views/HomeApp.vue'
import Profile from './../views/Profile.vue'
import store from '../store'


Vue.use(VueMaterial)



Vue.use(VueToastr, {
  defaultPosition: "toast-top-left",
  defaultTimeout: 10000,
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
    // {
    //   path: '/chatMessage',
    //   name: 'chatMessage',
    //   component: ChatMsg,
    //   // beforeEnter: (to, from, next) => {
    //    // store.state.room && store.state.username ? next('/chat') : next()
    //  // }
    // },
    {
      path: '/mainChat',
      name: 'mainChat',
      component: MainChat,
      // beforeEnter: (to, from, next) => {
       // store.state.room && store.state.username ? next('/chat') : next()
     // }
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    //   // beforeEnter: (to, from, next) => {
    //    // store.state.room && store.state.username ? next('/chat') : next()
    //  // }
    // },
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
      
    } ,
    {
      path: '/adminPage',
      name: 'adminPage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:AdminPage,
      
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:HomeApp,
      
    },
    {
      path: '/meetingList',
      name: 'meetingList',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:MeetingList,
      
    },
    {
      path: '/conference',
      name: 'conference',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Conference,
      
    }            
    
    
  ]
})
