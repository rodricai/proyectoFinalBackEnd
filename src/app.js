const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');

const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const socketRouter = require('./routes/socket.routes');

const app = express();
const httpServer = http.createServer(app);
const io2 = new socketIO.Server(httpServer);
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/realtimeproducts', socketRouter);

io2.of('/realtimeproducts').on('connection', (socket) => {
    console.log('Nuevo cliente conectado a /realtimeproducts');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado de /realtimeproducts');
    });
});

const PORT = 8080;

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
