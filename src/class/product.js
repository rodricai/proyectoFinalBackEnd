const { ProductManager } = require('../models/productManager');

const gestorProducts = new ProductManager("../productos.json");

const getProducts = (req, res) => {
    const limit = req.query.limit;
    const products = gestorProducts.getProducts();

    if (limit) {
        res.json(products.slice(0, parseInt(limit)));
    } else {
        res.json(products);
    }
};

const getProductById = (req, res) => {
    const idProducto = parseInt(req.params.pid);
    const producto = gestorProducts.getProductById(idProducto);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
};

const addProduct = (req, res) => {
    const nuevoProducto = req.body;
    gestorProducts.addProduct(nuevoProducto);
    res.status(201).json({ message: 'Producto agregado correctamente' });
};

const updateProduct = (req, res) => {
    const idProducto = parseInt(req.params.pid);
    const updatedFields = req.body;
    const updatedProduct = gestorProducts.updateProduct(idProducto, updatedFields);

    if (updatedProduct) {
        res.json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
};

const deleteProduct = (req, res) => {
    const idProducto = parseInt(req.params.pid);
    gestorProducts.deleteProduct(idProducto);
    res.json({ message: 'Producto eliminado correctamente' });
};

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
