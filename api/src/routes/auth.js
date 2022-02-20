const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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

//LOGIN

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password){
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).send("wrong password")
    
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: "2d"
    })

    res.status(200).json({user, accessToken})
  } catch (err) {
   res.status(500).json(err)
  }}
  else res.send("please enter an email and a valid password")
});

//LOGOUT




module.exports = router;
