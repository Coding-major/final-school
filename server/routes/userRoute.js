const express = require("express")
const router = express.Router()
const { authenticateUser, authorizeUser, authorizeGettingSingleUSer } = require("../middlewares/unAuthorized")
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword,
    updateUser,
    deleteUser
} = require("../controllers/usersController")


router.route("/").get(authenticateUser, authorizeUser("admin"), getAllUsers)
router.route("/showcurrentuser").get(authenticateUser, showCurrentUser)
router.route("/updateuser").patch(authenticateUser, updateUser)
router.route("/updateUserPassword").patch(authenticateUser,authorizeGettingSingleUSer(), updateUserPassword)
router.route("/:id").get(authenticateUser, authorizeUser("admin"), getSingleUser)
router.route("/deleteUser/:id").delete(authenticateUser, authorizeUser("admin"), deleteUser)
module.exports = router