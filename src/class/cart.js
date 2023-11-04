const  CartManager  = require('../models/cartManager');

class Cart {
  constructor() {
    this.gestorCarts = new CartManager('./carritos.json');
  }

  createCart(req, res) {
    const nuevoCarrito = this.gestorCarts.createCart();
    res.status(201).json({ message: 'Carrito creado correctamente', cart: nuevoCarrito });
  }

  getCartProducts(req, res) {
    const idCarrito = parseInt(req.params.cid);
    const carrito = this.gestorCarts.getCartById(idCarrito);

    if (carrito) {
      res.json(carrito.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  }

  addProductToCart(req, res) {
    const idCarrito = parseInt(req.params.cid);
    const idProducto = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }

    this.gestorCarts.addProductToCart(idCarrito, idProducto, quantity);
    res.json({ message: 'Producto agregado al carrito correctamente' });
  }
}

module.exports = Cart;
