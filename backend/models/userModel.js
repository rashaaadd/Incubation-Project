const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [ true, 'Please enter a name']
    },
    email:{
        type: String,
        required: [ true, 'Please enter a email'],
        unique:true
    },
    password:{
        type: String,
        required: [ true, 'Please enter a password']
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    seenNotifications:{
        type: Array,
        default: []
    },
    unseenNotifications:{
        type: Array,
        default: []
    }

}, {
    timestamps : true,
})


module.exports = mongoose.model('User',userSchema)