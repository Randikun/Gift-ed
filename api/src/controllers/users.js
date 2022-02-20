const bcrypt = require("bcrypt");
const User = require("../models/User");

const updateUser = async(req, res) => {
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password, salt);
  }

  try{ 
   const updatedUser = await User.findByIdAndUpdate(req.params.id, {
       $set: req.body
   }, {new:true})

   res.json(updatedUser)
  }catch{
      res.status(500).json(err)
  }

}

const deleteUser = async(req, res)=>{
    try{
      await User.findByIdAndDelete(req.params.id)
      res.json("User has been deleted")
    }catch{
        res.status(500).json(err)
    }
}

const getUser = async(req, res)=>{
    try{
      const User =  await User.findById(req.params.id)
      const {password, ...rest} = user._doc
      res.json(rest)
    }catch{
        res.status(500).json(err)
    }
}

const getAllUsers = async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)

    }catch{
        res.status(404).json("users not found")
    }
}

const getUserStats = async(req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
  try{
     const data = await User.aggregate([
         {$match: {createdAt: {$gte:lastYear}}},
        { $project: {
             month: {$month: "$createdAt"}
         }},
         {$group: {
             _id: "$month",
             total: {$sum: 1}
          }
        }
        
     ])
     res.json(data)
  }catch{
      res.status(500).json(err)
  }
}

module.exports = {updateUser, deleteUser, getUser, getAllUsers, getUserStats}