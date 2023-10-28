import express from "express";
import register from "../middleware/connection/register.js";
import login from '../middleware/connection/login.js';
import admin from '../middleware/auth/role.js';
import logout from "../middleware/connection/logout.js";
import verification from "../middleware/connection/verification.js";
import forgot from "../middleware/connection/forgot.js";

const authRoutes = express.Router();


// Connection routes

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);

// Verification routes

authRoutes.get('/verification', verification)

// Authentification routes

authRoutes.get("/admin", admin);

// Forgot password

authRoutes.post("/forgot", forgot);

export default authRoutes;

