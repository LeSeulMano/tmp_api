import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import coursRoutes from './routes/coursRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'https://57.129.14.178',
    'https://www.delmoo.fr',
    'https://delmoo.fr',
    'http://localhost:8080'
  ],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(authRoutes);

app.use(coursRoutes);

const serverOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/delmoo.fr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/delmoo.fr/fullchain.pem'),
};

const server = https.createServer(serverOptions, app);

server.listen(5000, () => {
  console.log('Serveur HTTPS running ...');
});
