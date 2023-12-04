const express = require('express');
const Cart = require('../class/Cart');
const cartRouter = express.Router();
const cartController = new Cart();

cartRouter.post('/', async (req, res) => {
  try {
    const nuevoCarrito = await cartController.createCart(req, res);
    res.status(201).json({ message: 'Carrito creado correctamente', cart: nuevoCarrito });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito', details: error.message });
  }
});

cartRouter.get('/:cid', async (req, res) => {
  try {
    const carrito = await cartController.getCartProducts(req, res);
    if (carrito) {
      res.json(carrito.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito', details: error.message });
  }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    await cartController.addProductToCart(req, res);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito', details: error.message });
  }
});

module.exports = cartRouter;
