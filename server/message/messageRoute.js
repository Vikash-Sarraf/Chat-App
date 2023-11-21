const express = require("express");

const router = express.Router()

const chatRoute = () => {
    const controller = require('./messageController')()
    router.post('/', controller.addMessage)   
    router.get('/:chatid', controller.getMessages) 
    return router
}

module.exports = chatRoute
