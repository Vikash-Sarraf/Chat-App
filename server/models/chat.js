var mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    members:Array,
    
    
},{timestamps:true})

module.exports = mongoose.model("chat", ChatSchema);