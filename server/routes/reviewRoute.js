const express = require("express")
const router = express.Router()
const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController")
const { authenticateUser, authorizeUser, authorizeGettingSingleUSer } = require("../middlewares/unAuthorized")
//const aggregation = require('../middlewares/aggregation')

router.route("/")
    .post(authenticateUser, authorizeUser("customer"), createReview)
    .get(getAllReviews)

router.route("/:id")
    .get(getSingleReview)
    .patch(authenticateUser, authorizeUser("user"), authorizeGettingSingleUSer(), updateReview)
    .delete(authenticateUser,authorizeUser("user"), authorizeGettingSingleUSer(), deleteReview)

module.exports = router;