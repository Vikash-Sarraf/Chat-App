const User = require("../models/user");
const Message = require('../models/message');


const controller = () => {
    return{
        addMessage: async (req,res) => {
            try {            
                const {chatid, senderid, text} = req.body;
                const newMessage = await Message.create({
                    chatid:chatid,
                    senderid:senderid,
                    text:text
                })
                return res.status(200).json(newMessage)
            } catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }
        },
        getMessages: async (req, res) => {
            try {
                const {chatid} = req.params
                const messages = await Message.find({chatid:chatid})
                return res.status(200).json(messages)
            } catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }
        },
        
    }
}

module.exports = controller;