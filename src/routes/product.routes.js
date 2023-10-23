const express = require('express');
const productController = require('../class/product');

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:pid', productController.getProductById);
productRouter.post('/', productController.addProduct);
productRouter.put('/:pid', productController.updateProduct);
productRouter.delete('/:pid', productController.deleteProduct);

module.exports = productRouter;
