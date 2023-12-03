/*const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', (socket) => {
      console.log('Usuario conectado');

      socket.on('disconnect', () => {
        console.log('Usuario desconectado');
      });
    });
  }

  realTimeProducts() {
    const products = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));
    this.io.emit('realTimeProducts', products);
  }
}

module.exports = Socket;
*/
const {Server}  = require('socket.io')

const init = (httpServer) => {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socketClient) => {
    console.log(`Usuario conectado ${socketClient.id}`);

  });
};
module.exports = init;