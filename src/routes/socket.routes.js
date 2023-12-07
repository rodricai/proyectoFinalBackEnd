const express = require('express');
const socketRouter = express.Router();
const socketServer = require('../class/socket');

socketRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
    res.send('OK');
});
module.exports = socketRouter;
