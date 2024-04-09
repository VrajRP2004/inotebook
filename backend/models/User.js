const mongoose = require('mongoose')

const {Schema} = mongoose;

const UserScheme = new  Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    data:{
        type:Date,
        default:Date.now
    }
})

const User = mongoose.model('user',UserScheme) 
// User.createIndexes(); // this make unique index in mongodb by email because here you give email as a unique
module.exports = User