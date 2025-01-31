const express = require("express")
const router = express.Router()

const { addToCart,
    getCart,
    removeFromCart,
    payForCart
 } = require("../controllers/cartController")

//  const {
//     authenticateUser,
//     authorizeUser,
//     authorizeGettingSingleUSer
// } = require("../middlewares/unAuthorized")

router.route("/").post(addToCart).get(getCart);
// router.route("/:productId").get(getCartItem);
router.route("/:productId").delete(removeFromCart);
router.route("/pay").post(payForCart);


module.exports = router