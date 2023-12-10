import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import coursRoutes from "./routes/coursRoutes.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = new express();


// const corsOptions = {
//     origin: ['http://57.129.14.178', 'http://localhost'],
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     headers: 'Content-Type, Authorization',
// };

const corsOptions = {
    origin: 'http://localhost:8080', // Remplacez cela par l'URL de votre application Vue.js
    credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://57.129.14.178',
  credentials: true,
}));
// app.use(cors(corsOptions));
app.use(authRoutes);
app.use(coursRoutes);
app.listen(5000, () => {
    console.log('Serveur running ...');
})
