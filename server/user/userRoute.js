const express = require("express");

const router = express.Router()
const authRoute = () => {
    const controller = require("./userController.js")()
    const authMiddleware = require('../middleware/authMiddleware.js')

    router.get('/:username',controller.getUser);
    router.post('/:username/update',authMiddleware,controller.updateUser)
    router.post('/:id/update_by_id',authMiddleware,controller.updateUserById)
    router.get('/:username/delete',authMiddleware,controller.deleteUser)
    router.get('/id/:id/',controller.getUserById)

    return router
}

module.exports = authRoute
