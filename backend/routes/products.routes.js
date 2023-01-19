const { getAllProducts, getSingleProducts, addNewProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const verifyLogin = require('../middlewares/auth.middlewares');

const productRoute=require('express').Router();

productRoute.get("/:id",getSingleProducts)
productRoute.get("/",getAllProducts)

productRoute.post("/create",verifyLogin,addNewProduct)

productRoute.patch("/:id",verifyLogin,updateProduct)

productRoute.delete("/:id",verifyLogin,deleteProduct)

module.exports=productRoute;