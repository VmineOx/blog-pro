const mongoose = require("mongoose");
const Joi = require("joi")
const jwt = require("jsonwebtoken")

//User Schema
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim: true,
        minlength: 5,
        maxlength : 50,
        unique : true
    },
    email : {
        type : String,
        required : true,
        trim: true,
        minlength: 5,
        maxlength : 50,
        unique : true
    },
    password : {
        type : String, 
        required : true,
        trim: true,
        minlength: 5,
    },
    profilePic: {
        type : Object,
        default: {
            url:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
            publicId: null
        }
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Generate Auth Token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET,{expiresIn: "30d"})
}

// User Model

const User = mongoose.model("User", UserSchema);

//validate register user
function validateRegisterUser(obj){
    const schema = Joi.object({
        username : Joi.string().trim().min(5).max(50).required(),
        email : Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().min(8).required()
    })
    return schema.validate(obj);
}

//validate login user
function validateLoginUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().min(8).required()
    })
    return schema.validate(obj);
}

//validate update user
function validateUpdateUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        email : Joi.string().trim().min(5).max(100).required().email(),
        password : Joi.string().trim().min(8).required()
    })
    return schema.validate(obj);
}

module.exports = { 
    User ,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
}