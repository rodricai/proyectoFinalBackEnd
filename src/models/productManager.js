const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.readProducts();
        this.productIdCounter = this.calculateProductIdCounter();
    }

    readProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data) || [];
        } catch (error) {
            console.error('Error reading products file:', error.message);
            return [];
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
        } catch (error) {
            console.error('Error saving products file:', error.message);
        }
    }

    calculateProductIdCounter() {
        if (this.products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.products.map(product => product.id), 0);
        return maxId + 1;
    }

    addProduct(product) {
        // Validar campos obligatorios
        const requiredFields = ['title', 'description', 'price', 'code', 'stock'];
        const missingFields = requiredFields.filter(field => !product[field]);

        if (missingFields.length > 0) {
            console.error(`Los campos obligatorios faltan: ${missingFields.join(', ')}`);
            return;
        }

        // Validar que el campo "code" no se repita
        if (this.products.some(p => p.code === product.code)) {
            console.error("Ya existe un producto con ese código");
            return;
        }

        // Agregar producto con id autoincrementable
        const newProduct = {
            id: this.productIdCounter++,
            status: true, // Por defecto
            thumbnails: [],
            ...product
        };
        this.products.push(newProduct);
        this.saveProducts();
        console.log("Producto agregado correctamente:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
        }
    }

    updateProduct(productId, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updatedFields,
                id: productId, 
            };
            this.saveProducts();
            console.log('Producto actualizado correctamente:', this.products[productIndex]);
            return this.products[productIndex];
        }

        console.error('Producto no encontrado');
        return null;
    }

    deleteProduct(productId) {
        this.products = this.products.filter(product => product.id !== productId);
        this.saveProducts();
        console.log('Producto eliminado correctamente con ID:', productId);
    }
}

module.exports = {
    ProductManager
};
