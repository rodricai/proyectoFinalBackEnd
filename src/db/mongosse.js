import mongoose from 'mongoose';

export const URI = 'mongodb+srv://developer:MXjUuMEvcfjbzJIP@cluster0.u800qwq.mongodb.net/';

export const initDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected');
    } catch (error) {
        console.error('error al conectarse a db');
    }
}