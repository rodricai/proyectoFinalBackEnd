const { ProductManager } = require('../models/productManager');

class Product {
  constructor() {
    this.gestorProducts = new ProductManager('./productos.json');
  }

  getProducts(req, res) {
    const limit = req.query.limit;
    const products = this.gestorProducts.getProducts();

    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  }

  getProductById(req, res) {
    const idProducto = parseInt(req.params.pid);
    const producto = this.gestorProducts.getProductById(idProducto);

    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  }

  addProduct(req, res) {
    const nuevoProducto = req.body;
    this.gestorProducts.addProduct(nuevoProducto);
    res.status(201).json({ message: 'Producto agregado correctamente' });
  }

  updateProduct(req, res) {
    const idProducto = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = this.gestorProducts.updateProduct(idProducto, updatedFields);

    if (updatedProduct) {
      res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  }

  deleteProduct(req, res) {
    const idProducto = parseInt(req.params.pid);
    this.gestorProducts.deleteProduct(idProducto);
    res.json({ message: 'Producto eliminado correctamente' });
  }
}

module.exports = Product;
