const router = require("express").Router();
const {updateUser, getUser, deleteUser, getAllUsers, getUserStats} = require("../controllers/users")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

router.get("/", verifyTokenAndAdmin, getAllUsers)
router.get("/:id", verifyTokenAndAdmin, getUser)
router.put("/:id", verifyTokenAndAuthorization, updateUser)
router.delete("/:id", verifyTokenAndAdmin, deleteUser)
router.get("/stats", verifyTokenAndAdmin, getUserStats)

module.exports = router;