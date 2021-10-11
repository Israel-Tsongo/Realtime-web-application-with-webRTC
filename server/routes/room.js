const express = require('express');
const roomRouter = express.Router();

const rooms = [
    {
        id: 1,
        name: 'PRIVATE_SCOPE'
    },
    {
        id: 2,
        name: 'SERVICE_SCOPE'
    },
    {
        id: 3,
        name: 'GENERAL_SCOPE'
    },
]

// route for get rooms
roomRouter.get('/', (req,res) => {
    res.send(rooms)
})

module.exports = roomRouter