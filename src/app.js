import express from 'express';
import exphbs from 'express-handlebars';
import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import { URI } from './db/mongosse.js';
import { __dirname } from './utils.js';
import path from 'path';
import {init as initPassport} from './passport/passport.config.js'

import cartRouter from "./routes/views/cartRoutes.js"
import productRouter from "./routes/product.routes.js";
import productManager from './productManager.js';
import viewsRoutes from './routes/socket.routes.js';
import indexRouter from './routes/views/index.router.js';
import chatRouter from './routes/views/chat.router.js';
import sessionRouter from './routes/api/session.router.js'
import sessionRender from './routes/views/sessions.routes.js'

const SESSION_SECRET = 'djalksdljaksjldk';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));

app.use(sessions({
    store: MongoStore.create({
       mongoUrl: URI,
       mongoOptions: {}, 
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))



initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');




app.get('/home',async (req,res) => {
    const product = await productManager.getProducts();
    res.render('index' , { title: 'handlebars y socket.io',product});
});

app.use('/old',productRouter);

app.get('/', (req,res) =>{
    res.redirect('/login')
});


app.use('/', sessionRender, sessionRouter);

app.use('/', viewsRoutes);

app.use('/api',cartRouter);

app.use('/api',indexRouter);

app.use('/api',chatRouter);

app.use((error,req,res,next) => {
    const message = `error desconocido: ${error.message}`;
    console.error(message);
    res.status(500).json({message});
    next();
})

 export default app;