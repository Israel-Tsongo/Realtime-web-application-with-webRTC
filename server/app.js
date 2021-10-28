
const express = require('express')
const app = express()
const io = app.io = require('socket.io')()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
//const busboy = require('connect-busboy');
const users = require('./routes/user')
 const profile = require('./routes/profile')
 const admin =require("./routes/admin")
 const rooms = require('./routes/room')
const chat = require('./chat_namespace')


const corsOpts={

    origin:"*",
    methods:[
        "GET",
        "POST"
    ],
    allowedHeaders:[
        'Content-Type',
    ],
}

    
app.use(cors(corsOpts)); 

app.use(bodyParser.json())

       

/**
 * Middleware
 */
app.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})


/**
 * Routing
 */
 app.use('/', users)
 app.use('/profile/', profile)
 
 app.use('/admin/', admin)

//app.use('/auth', users)
app.use('/rooms', rooms)

// Static routing
app.use(express.static(path.join(__dirname, '../dist')))

/**
 * Chat socket namespace
 */
chat.createNameSpace(io)


module.exports = app
