import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import coursRoutes from "./routes/coursRoutes.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = new express();

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

const corsOptions = {
    origin: 'http://localhost:8080', // Remplacez cela par l'URL de votre application Vue.js
    credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoutes);
app.use(coursRoutes);
app.listen(5000, () => {
    console.log('Serveur running ...');
})