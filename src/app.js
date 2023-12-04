const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs').promises;
const Product = require('./dao/models/productModel');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const { Server } = require('socket.io');
const PORT = 8080;
const mongoUri = 'mongodb+srv://developer:MXjUuMEvcfjbzJIP@cluster0.u800qwq.mongodb.net/';

async function loadProductsToMongo() {
  try {
    const jsonContent = await fs.readFile('./productos.json', 'utf-8');
    const productosDesdeJson = JSON.parse(jsonContent);

    await Product.deleteMany({});
    await Product.insertMany(productosDesdeJson);

    console.log('Productos insertados correctamente desde el archivo JSON');
  } catch (error) {
    console.error('Error al insertar productos desde el archivo JSON en MongoDB:', error);
  }
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('Error de conexión a MongoDB:', error));
db.once('open', async () => {
  console.log('Conectado a MongoDB Atlas');

  await loadProductsToMongo();

  const httpServer = http.createServer(app);

  const io = new Server(httpServer);
  require('./class/socket')(io);

  const hbs = exphbs.create();

  app.use(express.static('public'));
  app.use('/api/products', productRouter);
  app.use('/api/carts', cartRouter);

  app.engine('handlebars', hbs.engine);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'handlebars');

  app.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.render('index', { title: 'La Tienda Roja', products });
    } catch (error) {
      console.error('Error al obtener productos desde MongoDB:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  app.get('/cart', (req, res) => {
    try {
      const cartData = getCartData(); 

      res.render('cart', { products: cartData.products, total: cartData.total });
    } catch (error) {
      console.error('Error al obtener datos del carrito:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
