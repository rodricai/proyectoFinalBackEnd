const express = require('express');
const Cart = require('../class/Cart');

const cartRouter = express.Router();
const cartController = new Cart();

cartRouter.post('/', (req, res) => cartController.createCart(req, res));
cartRouter.get('/:cid', (req, res) => cartController.getCartProducts(req, res));
cartRouter.post('/:cid/product/:pid', (req, res) => cartController.addProductToCart(req, res));

module.exports = cartRouter;
