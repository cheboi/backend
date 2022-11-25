const { Router } = require("express");
const { getProducts, insertProduct, updateProduct } = require("../controllers/index");
const router = Router();

router.get("/", getProducts);
router.post("", insertProduct);
router.put("/:id", updateProduct )


module.exports = { router };
