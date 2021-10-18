
const express = require('express')
const app = express()
const io = app.io = require('socket.io')()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
//const busboy = require('connect-busboy');
const users = require('./routes/user')
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

// let ALLOWED_ORIGINS = ["http://192.168.43.150:8080", "http://localhost:8080"];
// app.use((req, res, next) => {
//     let origin = req.headers.origin;
//     let theOrigin = (ALLOWED_ORIGINS.indexOf(origin) >= 0) ? origin : ALLOWED_ORIGINS[0];
//     res.header("Access-Control-Allow-Origin", theOrigin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     next();
// })

// var corsOptions = {
//     origin:'*', //["http://www.example.com","http://localhost:3000"],
//     optionsSuccessStatus: 200 // For legacy browser support
//     }
    
    app.use(cors(corsOpts)); 

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.removeHeader('x-powered-by')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//  });

//app.use(cors())
app.use(bodyParser.json())
///app.use(busboy()) // Set 2MiB buffer  
       

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
 

//app.use('/auth', users)
app.use('/rooms', rooms)

// Static routing
app.use(express.static(path.join(__dirname, '../dist')))

/**
 * Chat socket namespace
 */
chat.createNameSpace(io)


module.exports = app
