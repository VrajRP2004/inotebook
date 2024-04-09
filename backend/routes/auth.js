const express = require('express');
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator')  // for validate user authentication or login
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "vrajisbillinour";
const fetchUser = require('../middleware/fetchUser')

// ROUTE 1: create user using: POST "/api/auth/createuser" . which does not require authentication
router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name : Name must be more than 2 character').isLength({ min: 2 }),
    body('password', 'Enter a valid Password : Password must be atleast 5 character').isLength({ min: 5 })
    // ],(req,res)=>{
], async (req, res) => {
    // in video 47
    // if there are errors, return Bad request and the errors 
    let success = false

    // in video 46
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false
        return res.status(400).json({success, errors: errors.array() })
    }
    // check weater the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        // console.log(user)
        success = false
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already exists" })
        }
        const salt = await  bcrypt.genSalt(10)
        const secpassword = await bcrypt.hash(req.body.password,salt) // secpassword = secured password
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            password: secpassword,
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        success = true
        res.json({success,authToken})
        // res.json(user)
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'Please enter unique value for email',message:err.message})})
        // res.send(req.body)
        // befor the video 46
        // console.log(req.body)
        // res.send('vraj')
        // const user = User(req.body) // make new user
        // user.save()
        // console.log(user)
        // res.send(req.body)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE 2: Authenticat a user using : POST "/api/auth/login". No login required 
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    let success = false
     // if there are errors, return Bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false
           return res.status(400).json({success,error:"Pleasee try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success = false
           return res.status(400).json({success,error:"Pleasee try to login with correct credentials"})
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        success = true
        res.json({success,authToken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }

})

// ROUTE 3: Get loggedin user detailes using : POST "/api/auth/getuser" Login required
router.post('/getuser',fetchUser,async (req, res) => {
try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message)
        res.status(500).send("Internal Server Error")
}
})
module.exports = router