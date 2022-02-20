const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuthorization } = require("./verifyToken");


//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new passworrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
}
});


const generateAccessToken = (user) =>{
    return  jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    })
}

const generateRefreshToken = (user) =>{
    return jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_REFRESH_SECRET)
}

const refreshTokens = [];

router.post("/refresh", (req, res) =>{
    // take users refresh token
        let reftoken = req.body.token
        //send error if token isnt valid
        if(!reftoken) return res.status(401).json("not authenticated")
        //if it ok create new access token, and refresh token and send it to user
        if(!refreshTokens.includes(reftoken)){
            return res.status(403).json("invalid token")
        }
        
        jwt.verify(reftoken, process.env.JWT_REFRESH_SECRET, (err, user)=>{
            err && console.log(err)
            
            refreshTokens = refreshTokens.filter(token=> token !== reftoken)
            
            const newAccessToken = generateAccessToken(user)
            const newRefreshToken = generateRefreshToken(user)
            
            refreshTokens.push(newRefreshToken)
            
            res.json({accessToken: newAccessToken, refreshToken: newRefreshToken})
        })
    })
    //LOGIN
    
    router.post("/login", async (req, res) => {
        if (req.body.email && req.body.password){
            try {
                const user = await User.findOne({ email: req.body.email });
                !user && res.status(404).send("user not found");
                
                const validPassword = await bcrypt.compare(req.body.password, user.password)
                !validPassword && res.status(400).send("wrong password")
                
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
                
                refreshTokens.push(refreshToken)
                
                res.status(200).json({user, accessToken, refreshToken})
            } catch (err) {
                res.status(500).json(err)
            }}
            else res.send("please enter an email and a valid password")
        });
    
    //LOGOUT

    router.post("/logout", verifyTokenAndAuthorization, (req,res) => {
        const refreshToken = res.body.token;
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)
        res.json("succesfull logout")
    })
    
    module.exports = router;
    