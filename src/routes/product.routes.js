const express = require('express');
const Product = require('../class/Product');

const productRouter = express.Router();
const productController = new Product();

productRouter.get('/', (req, res) => productController.getProducts(req, res));
productRouter.get('/:pid', (req, res) => productController.getProductById(req, res));
productRouter.post('/', (req, res) => productController.addProduct(req, res));
productRouter.put('/:pid', (req, res) => productController.updateProduct(req, res));
productRouter.delete('/:pid', (req, res) => productController.deleteProduct(req, res));

module.exports = productRouter;
