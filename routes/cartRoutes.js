const { Router } = require("express");
const { getCartItems, updateCartItems, removeItemFromCart } = require("../controllers/cartController");

const cartRoutes = Router();

cartRoutes.get("/cart", getCartItems);
cartRoutes.put('/:id', removeItemFromCart);
cartRoutes.put("/:id", updateCartItems);

module.exports = {cartRoutes}