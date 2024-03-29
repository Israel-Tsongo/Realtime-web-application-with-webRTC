const redis = require('redis')
const bluebird = require('bluebird')

const config = require('./../config/')

// Using promises
bluebird.promisifyAll(redis)

function ChatRedis() {
    this.client = redis.createClient({
        host: config.REDIS_HOST
    })
}

/**
 * Add user with hashMap
 * @param  {} room
 * @param  {} socketId
 * @param  {} userObject
 */
ChatRedis.prototype.addUser = function (room, socketId, userObject) {
    this.client
        .hsetAsync(room, socketId, JSON.stringify(userObject))
        .then(
            () => console.debug('addUser ', userObject.username + ' added to the room ' + room),
            err => console.log('addUser', err)
        )
}






ChatRedis.prototype.RemoveAll = function () {
    console.log("clearing cache")
    this.client.flushdb((err,succeeded)=>{
             console.log("clearing cahce")
            if(err)console.log("error")
            else console.log("purge Cache",succeeded)
        })
            
}






/**
 * Get all users by room
 * @param  {} room
 */
ChatRedis.prototype.getUsers = function (room) {
    return this.client
        .hgetallAsync(room)
        .then(users => {
            const userList = []
            for (let user in users) {
                userList.push(JSON.parse(users[user]))
            }
            return userList
        }, error => {
            console.log('getUsers ', error)
        })
}

/**
 * Delete a user in a room with socketId
 * @param  {} room
 * @param  {} socketId
 */
ChatRedis.prototype.delUser = function (room, socketId) {
    return this.client
        .hdelAsync(room, socketId)
        .then(
            res => (res),
            err => { console.log('delUser ', err) }
        )
}

/**
 * Get user by room and socketId
 * @param  {} room
 * @param  {} socketId
 */
ChatRedis.prototype.getUser = function (room, socketId) {
    return this.client
        .hgetAsync(room, socketId)
        .then(
            res => JSON.parse(res),
            err => { console.log('getUser ', err) }
        )
}

/**
 * Get number of clients connected in a room
 */
ChatRedis.prototype.getClientsInRoom = function (io, namespace, room) {
    return new Promise((resolve, reject) => {
        io.of(namespace).adapter.clients([room], (err, clients) => {
            if (err) reject(err)
            resolve(clients.length)
        })
    })
}

/**
 * Set user
 * @param  {} room
 * @param  {} socketId
 * @param  {} newValue
 */
ChatRedis.prototype.setUser = function (room, socketId, newValue) {
    return this.client
        .hsetAsync(room, socketId, JSON.stringify(newValue))
        .then(
            res => res,
            err => { console.log('setUser', err) }
        )
}

module.exports = new ChatRedis()
