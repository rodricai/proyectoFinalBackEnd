const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = this.readCarts();
        this.cartIdCounter = this.calculateCartIdCounter();
    }

    readCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error reading carts file:', error.message);
            return [];
        }
    }

    saveCarts() {
        try {
            const data = JSON.stringify(this.carts, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error('Error saving carts file:', error.message);
        }
    }

    calculateCartIdCounter() {
        if (this.carts.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.carts.map(cart => cart.id), 0);
        return maxId + 1;
    }

    createCart() {
        const newCart = {
            id: this.cartIdCounter++,
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        console.log('Carrito creado correctamente:', newCart);
        return newCart;
    }

    getCartById(cartId) {
        const cart = this.carts.find(c => c.id === cartId);
        if (cart) {
            return cart;
        } else {
            console.error('Carrito no encontrado');
        }
    }

    addProductToCart(cartId, productId, quantity) {
        const cartIndex = this.carts.findIndex(cart => cart.id === cartId);

        if (cartIndex !== -1) {
            const cart = this.carts[cartIndex];
            const existingProduct = cart.products.find(p => p.product === productId);

            if (existingProduct) {
                if (existingProduct.quantity !== undefined) {
                    existingProduct.quantity += quantity;
                } else {
                    existingProduct.quantity = quantity;
                }
            } else {
                cart.products.push({
                    product: productId,
                    quantity
                });
            }

            this.saveCarts();
            console.log(`Producto con id ${productId} agregado al carrito con id ${cartId}`);
        } else {
            console.error('Carrito no encontrado');
        }
    }
}

module.exports = CartManager;