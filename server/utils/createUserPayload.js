const createUserPayload = (user) => {
    return {name: user.name, userID: user._id, role: user.role, profilePicture: user.profilePicture}
}

module.exports = {
    createUserPayload
}