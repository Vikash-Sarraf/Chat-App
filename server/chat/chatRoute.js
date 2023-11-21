const express = require("express");

const router = express.Router()

const chatRoute = () => {
    const controller = require('./chatController')()
    router.post('/', controller.createChat)
    router.post('/group', controller.createGroupChat)   
    router.get('/:userid', controller.userChats) 
    router.get('/find/:firstid/:secondid', controller.findChat)
    return router
}

module.exports = chatRoute
