const http = require('http')
const redis = require('socket.io-redis')
const mongoose = require("mongoose")

const app = require('./app')
const config = require('./config')

// Server
const server = http.createServer(app)

// Atach server to the socket
app.io.attach(server)

// Origin socket configuration
app.io.origins([config.ORIGINS])

// Using the adapter to pass event between nodes
app.io.adapter(redis({ 
    host: config.REDIS_HOST, 
    port: config.REDIS_PORT 
}))

server.listen(config.PORT, () => {
    console.log(`Server Listening on port ${config.PORT}`)
})

mongoose.connect("mongodb://localhost:27017/ChatAppDb",{useNewUrlParser: true,useUnifiedTopology:true })
.then(()=>console.log("Connection has been made "))
.catch((error)=>console.log("Errr is ", error))



//Entry point