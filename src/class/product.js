const ProductModel = require('../dao/models/productModel');

class ProductController {
  
  async getProducts(req, res) {
    try {
      const { limit, page, sort, query } = req.query;
      const options = {
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
        sort: sort || { _id: 1 },
      };

      let filter = {};

      if (query) {
        filter = { category: query };
      }

      const products = await ProductModel.paginate(filter, options);

      res.json({
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
        nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
      });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al obtener los productos', details: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const idProducto = req.params.pid;
      const producto = await ProductModel.findById(idProducto);

      if (producto) {
        res.json({ status: 'success', payload: producto });
      } else {
        res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al obtener el producto', details: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const nuevoProducto = req.body;
      await ProductModel.create(nuevoProducto);
      res.status(201).json({ status: 'success', message: 'Producto agregado correctamente' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al crear el producto', details: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const idProducto = req.params.pid;
      const updatedFields = req.body;
      const updatedProduct = await ProductModel.findByIdAndUpdate(idProducto, updatedFields, { new: true });

      if (updatedProduct) {
        res.json({ status: 'success', message: 'Producto actualizado correctamente', payload: updatedProduct });
      } else {
        res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al actualizar el producto', details: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const idProducto = req.params.pid;
      await ProductModel.findByIdAndDelete(idProducto);
      res.json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al eliminar el producto', details: error.message });
    }
  }
}

module.exports = ProductController;
