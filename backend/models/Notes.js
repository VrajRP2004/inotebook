const mongoose = require('mongoose')

const {Schema} = mongoose;

const NoteScheme = new  Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true,
        default:'General'
    },
    data:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Notes',NoteScheme)