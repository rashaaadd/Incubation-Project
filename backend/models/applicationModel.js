const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,"Please enter a name"]
        },
        address:{
            type: String,
            required: [true,"Please enter address"]
        },
        city:{
            type: String,
            required: [true,"Please enter city"]
        },
        state:{
            type: String,
            required: [true,"Please enter state"]
        },
        email:{
            type: String,
            required: [true,"Please enter a email"]
        },
        contact:{
            type: [String,Number],
            required: [true,"Please enter mobile number"]
        },
        companyName:{
            type: String,
            required: [true,"Please enter company name"]
        },
        companyDetails:{
            type: String,
            required: [true,"Please enter company name"]
        },
        companyTeamDetails:{
            type: String,
            required: [true,"Please enter company name"]
        },
        status:{
            type:String,
            default:'Pending'
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
        
    },{
        timestamps : true,
    }
)

module.exports = mongoose.model('Application',applicationSchema)