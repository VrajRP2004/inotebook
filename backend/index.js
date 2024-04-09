const connectToMongo  = require('./db')
const express = require("express")
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors());

// if you want to use request.body the you have to use this app.use(express.json()) this is assign as global so you have not write in every file just write in main file
app.use(express.json())

// available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

// app.get('/',(req,res)=>{
//     res.send('express is running')
// })

app.listen(port,()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})