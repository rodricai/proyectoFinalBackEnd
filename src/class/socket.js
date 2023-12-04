const MessageService = require('../services/messageService');

function initSocket(io) {
  const messageService = new MessageService();

  io.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`);

   
    messageService.getMessages()
      .then((messages) => {
        socket.emit('oldMessages', messages);
      })
      .catch((error) => {
        console.error('Error al obtener mensajes antiguos:', error);
      });

    socket.on('disconnect', () => {
      console.log(`Usuario desconectado ${socket.id}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
       
        await messageService.addMessage(data.user, data.message);

        
        io.emit('messageReceived', data);
      } catch (error) {
        console.error('Error al procesar mensaje:', error);
      }
    });
  });
}

module.exports = initSocket;
