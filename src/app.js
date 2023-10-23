const express = require('express');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
