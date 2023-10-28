import express from "express";
import list from "../middleware/cours/list.js";
import add from "../middleware/cours/add/add.js";
import multer from 'multer';
import update from "../middleware/cours/update.js";
import deleteFile from "../middleware/cours/delete.js";
import search from "../middleware/cours/search.js";
import year from '../middleware/cours/year.js';

const coursRoutes = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })


coursRoutes.get("/cours", list);
coursRoutes.post("/cours/add", upload.single('file'), add);
coursRoutes.post("/cours/update/:id", update);
coursRoutes.get("/cours/delete/:id", deleteFile);
coursRoutes.post("/cours/search", search);
coursRoutes.post("/cours/year", year);

export default coursRoutes;