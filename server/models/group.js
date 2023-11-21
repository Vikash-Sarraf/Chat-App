var mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
    members:Array,
    group_name: String
    
    
},{timestamps:true})

module.exports = mongoose.model("group", GroupSchema);