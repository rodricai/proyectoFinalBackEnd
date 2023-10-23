const { CartManager } = require('../models/cartManager');

const gestorCarts = new CartManager('./carritos.json');

const createCart = (req, res) => {
    const nuevoCarrito = gestorCarts.createCart();
    res.status(201).json({ message: 'Carrito creado correctamente', cart: nuevoCarrito });
};

const getCartProducts = (req, res) => {
    const idCarrito = parseInt(req.params.cid);
    const carrito = gestorCarts.getCartById(idCarrito);

    if (carrito) {
        res.json(carrito.products);
    } else {
        res.status(404).json({ error: 'Carrito no encontrado' });
    }
};

const addProductToCart = (req, res) => {
    const idCarrito = parseInt(req.params.cid);
    const idProducto = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    gestorCarts.addProductToCart(idCarrito, idProducto, quantity);

    res.json({ message: 'Producto agregado al carrito correctamente' });
};

module.exports = {
    createCart,
    getCartProducts,
    addProductToCart
};
