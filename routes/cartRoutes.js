const { Router } = require("express");
const { getCartItems } = require("../controllers/cartController");

const cartRoutes = Router();

cartRoutes.get("/cart", getCartItems);

module.exports = {cartRoutes}