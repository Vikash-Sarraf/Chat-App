const User = require("../models/user");
const Chat = require('../models/chat');
const Group = require("../models/group")


const controller = () => {
    return{
        createChat: async (req,res) => {
            const members = [req.body.senderid, req.body.recieverid]
            try {            
                const chat = await Chat.findOne({
                    members: {$all:members}
                })
                if (chat===null){
                    const newChat = await Chat.create({members:members})
                    return res.status(200).json(newChat)
                }
                else{
                    return res.status(200).json(chat)
                }
            } catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }
        },
        createGroupChat: async (req, res) => {
            try {
                const members = req.body.members
                const groupName = req.body.group_name
                const newGroup = await Group.create({members:members,group_name:groupName})
                return res.status(200).json(newChat)

            }catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }

        },
        userChats: async (req, res) => {
            try {
                const userid = req.params.userid;
                const chats = await Chat.find({members:userid})
                const groups = await Group.find({members:userid})
                return res.status(200).json({chats,groups})
            } catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }
        },
        findChat: async (req, res) => {
             try {
                if(req.params.firstid !== req.params.secondid){
                const chat = await Chat.findOne({
                        members: {$all:[req.params.firstid, req.params.secondid]}
                    })
                    return res.status(200).json(chat)
                }
                else {
                    return res.status(500).json("error")
                }
            } catch (e) {
                console.log(e)
                return res.status(500).json("error")
            }
        },
    }
}

module.exports = controller;