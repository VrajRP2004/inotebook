const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://vrajprajapati21:fBPJGT1bzcKN7lkJ@cluster0.m6tyz4b.mongodb.net/'
// fBPJGT1bzcKN7lkJ
// mongodb+srv://vrajprajapati21:fBPJGT1bzcKN7lkJ@cluster0.m6tyz4b.mongodb.net/
// mongodb+srv://vrajprajapati21:fBPJGT1bzcKN7lkJ@cluster0.m6tyz4b.mongodb.net/
const connectToMongo = () =>{
    mongoose.connect(mongoURI)
    console.log('vraj')
}

module.exports = connectToMongo;