const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next)=>{
    let token
    // console.log('kunjikannaaaaaa authmiddlewaravde ethi ketto');
    // console.log(req.headers,'header aan pulle');
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]
            // console.log(token);
            //Verify token
            const decoded  = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded,'decoded user details............');
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(req.user);
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('User not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
}) 

module.exports = {
    protect
}