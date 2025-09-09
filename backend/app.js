import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

import connectDB from './config/db.js';
import authRoutes from './router/authRoute.js';
import setupSocket from './socket.js';

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin:process.env.Client_URL,
    credentials:true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
}
));
app.use('/api',authRoutes);
const port =  process.env.Port ||8080;



connectDB().then(() => { 
    const server = app.listen(port, () => {
        console.log("server is running on port: ", port);
    });
    
    setupSocket(server);

});





