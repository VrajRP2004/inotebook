const jwt = require("jsonwebtoken")
const JWT_SECRET = "vrajisbillinour";

const fetchUser = (req,res,next)=>{
    // Get the user form the jwt token and add id to request object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate with valid token"})
    }
}

module.exports = fetchUser;