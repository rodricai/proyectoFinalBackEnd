const express = require('express');
const socketRouter = express.Router();
const socket = require('../class/socket');

const socketController = new socket();

socketRouter.get('/realtimeproducts', (req, res) => socketController.realTimeProducts(req, res));

module.exports = socketRouter;
