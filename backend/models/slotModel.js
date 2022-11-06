const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    userId:{
        type: String,
    },
    appId:{
        type: String,
    },
    status:{
        type: Boolean,
        default: false
    }

}, {
    timestamps : true,
})


module.exports = mongoose.model('Slot',slotSchema)