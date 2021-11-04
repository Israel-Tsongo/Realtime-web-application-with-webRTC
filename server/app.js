
const express = require('express')
const app = express()
const io = app.io = require('socket.io')()
const cors = require('cors')
//const bodyParser = require('body-parser')
const path = require('path')
//const busboy = require('connect-busboy');
const users = require('./routes/user')
 const profile = require('./routes/profile')
 const admin =require("./routes/admin")
 const rooms = require('./routes/room')
const chat = require('./chat_namespace')



const corsOpts={

    origin:"*",
    credentials:true,
    'allowedHeaders':['sessionId','Content-Type'],
    'exposedHeaders':['sessionId'],
    'methods':'GET,HEAD,PUT,PACTH,POST,DELETE',
    'preflightContinue':false
}

    
app.use(cors(corsOpts)); 

app.use(express.json())

       

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
 app.use('/profile', profile)
 
 app.use('/admin', admin)

//app.use('/auth', users)
app.use('/rooms', rooms)

app.get("/services",(req,res)=>{
     const service=[

        {
            name:"Technique",
            description:"Ce service se charge de la technique de l'entreprise et de la securitee des donnees."
        },
        {
            name:"Economique",
            description:"Ce service se charge de l'economie'de l'entreprise."
        },
        {
            name:"Marketing",
            description:"Ce service se charge  du Marketing ."
        },
        {
            name:"Administratif",
            description:"Ce service se charge de la direction de l'entreprise et de la gestion."
        }

     ]

   
    res.status(200).json({services:service})
})

// Static routing
app.use(express.static(path.join(__dirname, '../dist')))

/**
 * Chat socket namespace
 */
chat.createNameSpace(io)


module.exports = app
