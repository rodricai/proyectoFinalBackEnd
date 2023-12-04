const CartModel = require('../dao/models/cartModel');

class Cart {
  async createCart(req, res) {
    try {
      const nuevoCarrito = await CartModel.create({});
      res.status(201).json({ message: 'Carrito creado correctamente', cart: nuevoCarrito });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito', details: error.message });
    }
  }

  async getCartProducts(req, res) {
    try {
      const idCarrito = req.params.cid;
      const carrito = await CartModel.findById(idCarrito);

      if (carrito) {
        res.json(carrito.products);
      } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el carrito', details: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const idCarrito = req.params.cid;
      const idProducto = req.params.pid;
      const quantity = parseInt(req.body.quantity);

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
      }

      const carrito = await CartModel.findById(idCarrito);
      carrito.products.push({ product_id: idProducto, quantity });
      await carrito.save();

      res.json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar producto al carrito', details: error.message });
    }
  }
}

module.exports = Cart;
