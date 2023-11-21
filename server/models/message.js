var mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    chatid: String,
    senderid: String,
    text: String
    
},{timestamps:true})

module.exports = mongoose.model("message", MessageSchema);