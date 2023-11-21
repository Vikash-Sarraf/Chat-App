var mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    f_n: {
        type: String,
        required: true
    },
    l_n: {
        type: String,
        required: true
    },
    friend: {
        type:Array,
        default:[]
    },
    requests: {
        type: Array,
        default:[]
    },
    pfp: String,
},{timestamps:true})

module.exports = mongoose.model("user", UserSchema);