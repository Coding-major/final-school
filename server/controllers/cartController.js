const { StatusCodes } = require("http-status-codes");
const Cart = require("../models/cart")

// Add product to cart
const addToCart = async (req, res) => {
    const { productId, price, quantity, name } = req.body;
    console.log(req.body);

    const userId = req.user.userID

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, products: [], totalPrice: 0 });
    }

    const existingProduct = cart.products.find((item) => item.productId.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ productId, name, price, quantity });
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    res.status(201).json({ msg: "Product added to cart" });
};

// Get all products in a user's cart
const getCart = async (req, res) => {
    const userId = req.user.userID
    const cart = await Cart.findOne({ userId })

    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    console.log(cart);
    
    res.status(StatusCodes.OK).json({msg: cart});
};

// Get a specific product from the cart
// const getCartItem = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.user.userID
//   const cart = await Cart.findOne({ userId });

//   if (!cart) return res.status(404).json({ message: "Cart not found" });

//   const product = cart.products.find((item) => item.productId.toString() === productId);

//   if (!product) return res.status(404).json({ message: "Product not found in cart" });

//   res.json(product);
// };

// Remove a product from the cart
const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    
    const userId = req.user.userID
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.products = cart.products.filter((item) => item._id.toString() !== productId);
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await cart.save();
    console.log(cart);
    
    
    res.json({ msg: cart });
};

// Pay for the cart
const payForCart = async (req, res) => {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Simulate payment process
    cart.products = [];
    cart.totalPrice = 0;

    await cart.save();
    res.json({ message: "Payment successful, cart is now empty" });
};

module.exports = { addToCart, getCart, removeFromCart, payForCart };
