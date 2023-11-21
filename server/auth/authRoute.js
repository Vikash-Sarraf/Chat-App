const express = require("express");

const router = express.Router()
const authRoute = () => {
    const controller = require("./authController")()

    router.post('/register',controller.register);
    router.post('/login',controller.login)
    return router
}

module.exports = authRoute
