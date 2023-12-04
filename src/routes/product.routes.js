const express = require('express');
const Product = require('../class/Product');
const productRouter = express.Router();
const productController = new Product();

productRouter.get('/', async (req, res) => {
  try {
    const products = await productController.getProducts(req, res);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
  }
});

productRouter.get('/:pid', async (req, res) => {
  try {
    const product = await productController.getProductById(req, res);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const nuevoProducto = await productController.addProduct(req, res);
    res.status(201).json({ message: 'Producto creado correctamente', product: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto', details: error.message });
  }
});

productRouter.put('/:pid', async (req, res) => {
  try {
    await productController.updateProduct(req, res);
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto', details: error.message });
  }
});

productRouter.delete('/:pid', async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto', details: error.message });
  }
});

module.exports = productRouter;
