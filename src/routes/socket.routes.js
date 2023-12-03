const express = require('express');
const socketRouter = express.Router();
const socketServer = require('../class/socket');

socketRouter.get('/realtimeproducts', (req, res) => {
    socketServer.emit('realTimeProducts', { /* datos que deseas enviar */ });
    res.send('OK');
});
module.exports = socketRouter;
