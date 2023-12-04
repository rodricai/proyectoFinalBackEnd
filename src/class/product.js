const ProductModel = require('../dao/models/productModel');

class Product {
  async getProducts(req, res) {
    try {
      const limit = req.query.limit;
      let products = await ProductModel.find();

      if (limit) {
        products = products.slice(0, parseInt(limit));
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const idProducto = req.params.pid;
      const producto = await ProductModel.findById(idProducto);

      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const nuevoProducto = req.body;
      await ProductModel.create(nuevoProducto);
      res.status(201).json({ message: 'Producto agregado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto', details: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const idProducto = req.params.pid;
      const updatedFields = req.body;
      const updatedProduct = await ProductModel.findByIdAndUpdate(idProducto, updatedFields, { new: true });

      if (updatedProduct) {
        res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const idProducto = req.params.pid;
      await ProductModel.findByIdAndDelete(idProducto);
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
    }
  }
}

module.exports = Product;
