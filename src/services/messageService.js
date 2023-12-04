const Message = require('../dao/models/messageModel');

class MessageService {
  async addMessage(user, message) {
    const newMessage = new Message({
      user,
      message
    });

    try {
      return await newMessage.save();
    } catch (error) {
      console.error('Error al agregar mensaje en MongoDB:', error);
      throw error;
    }
  }

  async getMessages() {
    try {
      return await Message.find();
    } catch (error) {
      console.error('Error al obtener mensajes desde MongoDB:', error);
      throw error;
    }
  }
}

module.exports = MessageService;
