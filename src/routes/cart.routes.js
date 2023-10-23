const express = require('express');
const cartController = require('../class/cart');

const cartRouter = express.Router();

cartRouter.post('/', cartController.createCart);
cartRouter.get('/:cid', cartController.getCartProducts);
cartRouter.post('/:cid/product/:pid', cartController.addProductToCart);

module.exports = cartRouter;
