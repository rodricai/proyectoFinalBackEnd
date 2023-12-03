const express = require('express');
const http = require('http');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require("fs");
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const { Server } = require('socket.io');  // Importa Server de socket.io
const PORT = 8080;

const httpServer = http.createServer(app);

// Inicializa el servidor de sockets
const io = new Server(httpServer);
require('./class/socket')(io);  // Pasa io al initSocket en socket.js

const hbs = exphbs.create();

app.use(express.static('public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  const productsPath = path.join(__dirname, '../productos.json');
  const productsData = fs.readFileSync(productsPath, 'utf-8');
  const products = JSON.parse(productsData);
  res.render('index', { title: 'La Tienda Roja', products });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});








const socketIO = require('socket.io');
const io2 = new socketIO.Server(httpServer);
const socketRouter = require('./routes/socket.routes');
app.use('/realtimeproducts', socketRouter);
io2.of('/realtimeproducts').on('connection', (socket) => {
    console.log('Nuevo cliente conectado a /realtimeproducts');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado de /realtimeproducts');
    });
});
