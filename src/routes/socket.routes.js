import express from 'express';
const socketRouter = express.Router();

socketRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {});
    res.send('OK');
});

export default socketRouter;

