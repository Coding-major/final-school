const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const {
    createUserPayload,
    verifyJWT,
    attachCookiesToResponse,
} = require("../utils/index")
const {
    customError,
    notFound,
    unAuthorized,
    badRequest
} = require("../errors/indexErrors")

const getAllUsers = async (req, res) => {
    const users = await User.find().select("-password -profilePicture -description -verificationToken -isVerified")
    if (!users) {
        throw new notFound("No users in the list")
    }

    console.log(users);
    
    res.status(StatusCodes.OK).json({msg: users})
}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select("-password")
    
    if (!user) {
        throw new notFound("user with that id does not exist")
    }
    res.status(StatusCodes.OK).json({msg: user})
}


const showCurrentUser = async (req, res) => {
    
    const {userID} = req.user
    const user = await User.findById(userID).select('-password -verificationToken -isVerified -verified -_id');
    console.log(user);
    
    if (!user) {
        throw new notFound("user with that id does not exist")
    }
    console.log(user);
    
    res.status(StatusCodes.OK).json({msg: user})
}

const updateUser = async (req, res) => {
    const {name, phoneNumber, description, password, retypePassword} = req.body;
    if (password !== retypePassword) {
        throw new badRequest("your both passwords does not match")
    }

    console.log(req.body);
    

    // const user = await User.findOneAndUpdate({_id: req.user.userID}, {email, name}, {
    //     new: true,
    //     runValidators: true
    // })

    const user = await User.findOne({_id: req.user.userID})
    if (name) {
        user.name = name;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber
    }
    if (description) {
        user.description = description
    }
    if (password) {
        user.password
    }
    await user.save()

    const userPayload = createUserPayload(user)
   
    attachCookiesToResponse(res, userPayload)
    res.status(StatusCodes.OK).json({msg: userPayload})
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword, newPasswordAgain } = req.body;
    if (!oldPassword || !newPassword || !newPasswordAgain) {
        throw new badRequest("please enter a value")
    }

    
    const user = await User.findOne({_id: req.user.userID})
    
    const isCorrect = await user.comparePassword(oldPassword)
    if (!isCorrect) {
        throw new unAuthorized("invalid credentials")
    }

    if (newPassword !== newPasswordAgain) {
        throw new unAuthorized("both new password does not match")
    }

    user.password = newPassword

    await user.save()
    res.status(StatusCodes.OK).json({msg: "password change successful"})


}

const deleteUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        throw new notFound("No user with the ID")
    }

    res.status(StatusCodes.OK).json({msg: "delete successful"})
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser
}