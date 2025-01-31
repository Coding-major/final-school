const User = require('../models/user')
const path = require('path');
const { customError, badRequest, unAuthorized, notFound  } = require("../errors/indexErrors")
const { StatusCodes } = require("http-status-codes")
const crypto = require('crypto')
const {
    createUserPayload,
    attachCookiesToResponse,
    sendVerification
} = require("../utils/index")
const bcrypt = require("bcryptjs")

const verifyEmail = async (req, res) => {
    const {email, verificationToken} = req.body;

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("no user with that email exist")
    }

    if (user.isVerified) {
        throw new badRequest('The account is already verified',
        )
    }

    if (verificationToken != user.verificationToken) {
        throw new unAuthorized('wrong verifiication token provided')
    }

    await User.findOneAndUpdate({email}, { verified: Date.now(), isVerified: true})
    // user.isVerified = true;
    // user.verified = Date.now()
    // verificationToken = ''
    // await user.save();

    res.status(StatusCodes.OK).json({msg: "email verified"})
}

// i write the code for resgisetr
const register = async (req, res) => {
    const {name, email, password, phoneNumber, retypePassword, role, description, adminCode} = req.body
    
    const profilePicture = ""
    let profilePicturePath = ""

    if (adminCode) {
        if (adminCode !== process.env.ACCESS_CODE) {
            throw new unAuthorized("you are not allowed to create admin account")
        }
    }


    if (req.files) {
        
        const profilePicture = req.files.profilePicture;
        if (!profilePicture.mimetype.startsWith('image')) {
            throw new badRequest("please upload a valid image")
        } else if (profilePicture.mimetype.startsWith('image')) {
            const maxSize = 1024 * 1024; // 1 MB
            if (profilePicture.size > maxSize) {
                throw new badRequest("please upload an image less than 1MB")
            }
    
            // Save the file
            const fileName = `${Date.now()}-${profilePicture.name}`;
            const imagePath = path.join(__dirname, '../public/uploads', fileName);
            await profilePicture.mv(imagePath);
    
            profilePicturePath = `/uploads/${fileName}`;
        }
        
    }

    if (!email || !password || !retypePassword|| !name || !role || !phoneNumber) {
        throw new badRequest("please fill the neccessary fields")
    }

    if (password !== retypePassword) {
        throw new badRequest("passwords do not match")
    }

    const emailExist = await User.findOne({email})

    if(emailExist) {
        throw new badRequest("ommoh the email already exist, shey you go like login")
    }
    


    const verificationToken = crypto.randomBytes(40).toString('hex');
    const user = await User.create({
        email,
        password,
        name,
        role,
        verificationToken,
        description,
        phoneNumber,
        profilePicture: profilePicturePath
    })

    if (!user) {
        throw new customError("user not created")
    }
    // const origin = "http://localhost:3000"

    // await sendVerification({
    //     name: user.name,
    //     email: user.email,
    //     verificationToken: user.verificationToken,
    //     origin
    // });
    const userPayload = createUserPayload(user)
    
    attachCookiesToResponse(res, userPayload)

    res.status(StatusCodes.CREATED).json({msg: userPayload})
}

const login = async (req, res) => {
    const {email, password} = req.body;
    

    if (!email || !password) {
        throw new badRequest("you be dan iska?, fill the form jare")
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new notFound("you no get Account, kuku register")
    }

    // if (user.isVerified != true) {
    //     throw new unAuthorized("verify your account if you no wan die")
    // }
    //const isCorrect = user.comparePassword(password)

    // if (!isCorrect) {
    //     throw new unAuthorized("password is not correct")
    // }


    // const salt = await bcrypt.genSalt(10)
    // const hashedPasssword = await bcrypt.hash(password, salt)

    const isCorrect = await bcrypt.compare(password, user.password)

    if (!isCorrect) {
        throw new unAuthorized("password is not corrector")
    }


    const userPayload = createUserPayload(user)

    
    attachCookiesToResponse(res, userPayload)


    res.status(StatusCodes.CREATED).json({msg: userPayload})

}


const logout = async (req, res) => {
    res.cookie("my_token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({msg: "user logout"})
}

module.exports = {
    verifyEmail,
    register,
    login,
    logout
}