const { Router } = require("express");
const { getProducts, insertProduct, updateProduct, getProduct, deleteProduct } = require("../controllers/index");
const router = Router();

router.get("/",getProducts);
router.post("", insertProduct);
router.put("/:id", updateProduct )
router.get('/:id', getProduct)
router.delete('/:id',deleteProduct)


module.exports = { router };
