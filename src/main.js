import Vue from 'vue'
import App from './App.vue'
//import App from './App2.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'
import VueResource from 'vue-resource'
import './styles/app.scss'
import { url } from './utils/config'
import adapter from 'webrtc-adapter'
//import Toasted from 'vue-toasted'

console.log(`Browser ${adapter.browserDetails.browser} - version ${adapter.browserDetails.version}`)


// Vue.use(Toasted,  {
//   router,
//   duration:50000,
//   position: 'top-center',
//   theme:'bubble',
//   type:'info',
//   icon:'check',  
//   fullWidth:true,
  
//   action:[
        
//         {  
//           text:'Decline',
//           onClick:(e,toastObject)=>{
//             toastObject.goAway(0);
//           }
//         }, 
//         { 
//           text:'Accept',
//           href:'/conference?value=JoinIt'
//         }
//     ]
   
  
// })







// Socket config
Vue.use(new VueSocketIO({
  debug: true,
  connection: io(`${url}/video-chat`, { autoConnect: false }),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

// Vue resource for http
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
