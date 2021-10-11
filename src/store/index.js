import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { STATUS_OPTIONS, url, STORE_ACTIONS } from '../utils/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    room: undefined,
    username: undefined,
    matricule:undefined,
    password:undefined,    
    status: STATUS_OPTIONS.available,
    rooms: []
  },
  mutations: {

    signIn(state,{nomLog,matricule,passwordLog}){
      state.username=nomLog 
      state.matricule=matricule
      state.password=passwordLog

    },
    signUp(state){
      state.username=undefined,
      state.room= undefined      

    },
    joinRoom(state, { room,username }) {
      state.room = room,
      state.username = username
    },
    changeRoom(state, room) {
      state.room = room
    },
    setRooms(state, rooms) {
      state.rooms = rooms
    },
    leaveChat(state) {
      state.room = undefined
      state.username = undefined
    },
    changeStatus(state) {
      let nextStatus
      if (state.status === STATUS_OPTIONS.available) nextStatus = STATUS_OPTIONS.absent
      if (state.status === STATUS_OPTIONS.absent) nextStatus = STATUS_OPTIONS.unavailable
      if (state.status === STATUS_OPTIONS.unavailable) nextStatus = STATUS_OPTIONS.available

      state.status = nextStatus
    }
  },
  actions: {
   
    signUp({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          const { body } = await Vue.http.post(`${url}/register`, data)

          if (body.code === 400 || body.code === 401 || body.code === 500) {
            reject({ message: body.message })
            console.log(`Message from the server after Sign up: ${body.message}`)
          }
          commit(STORE_ACTIONS.signUp, data)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    signIn({ commit }, data) {
      return new Promise(async (resolve, reject) => {
        try {
          console.log("Sign in has been called")
          ///const { body } = await Vue.http.post(`${url}/login`, data)
          await axios.post(`${url}/login`, data).then(function(response){
             
              commit(STORE_ACTIONS.signIn, response.data)
              resolve()

          }).catch(function(error){
                  if (error.response.status === 400 || error.response.status === 401 || error.response.status === 500) {
                    reject({ message: error.response.data })
                    console.log(`Message from the server afetr Sign in : ${error.response.data}`)
                  }
                  reject(error)
          })          
         
        } catch (error) {
          reject(error)
        }
      })
    },
   
   
   
   
    joinRoom({ commit }, userAndRoom) {

      console.log("username",this.state.username)
      let data = {...userAndRoom,username:this.state.username,password:this.state.password}

      return new Promise(async (resolve, reject) => {
        try {
          const { body } = await Vue.http.post(`${url}/auth`, data)

          if (body.code === 400 || body.code === 401 || body.code === 500) {
            reject({ message: body.message })
            console.log(`Message from the server: ${body.message}`)
          }
          commit(STORE_ACTIONS.joinRoom, data)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    changeRoom({ commit }, room) {
      commit(STORE_ACTIONS.changeRoom, room)
    },
    setRooms({ commit }) {
      return new Promise(async (resolve, reject) => {
        try {
          // const rooms = await Vue.http.get(`http://${url}/rooms`)
          const rooms = [{
              id: 1,
              name: 'PRIVATE_SCOPE'
            }, {
              id: 2,
              name: 'SERVICE_SCOPE'
            },{
              id: 3,
              name: 'GENERAL_SCOPE'
            },
          ]
          commit(STORE_ACTIONS.setRooms, rooms)
          resolve(rooms)
        } catch (error) {
          reject(error)
        }
      })
    },
    leaveChat({ commit }, username) {
      return new Promise(async (resolve, reject) => {
        try {
          const { body : { code } } = await Vue.http.post(`${url}/auth/logout`, { username })
          if (code !== 200) reject()
          commit(STORE_ACTIONS.leaveChat)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    changeStatus({ commit }) {
      commit(STORE_ACTIONS.changeStatus)
    }
  }
})
