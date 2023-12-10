import express from "express";
import register from "../middleware/connection/register.js";
import login from '../middleware/connection/login.js';
import admin from '../middleware/auth/role.js';
import logout from "../middleware/connection/logout.js";
import verification from "../middleware/connection/verification.js";
import forgot from "../middleware/connection/forgot.js";
import user from "../middleware/users/getUsers.js";
import changeRole from "../middleware/users/changeRole.js";
import deleteUser from "../middleware/users/deleteUser.js";
import connect from "../middleware/connection/connect.js";
import currentUser from "../middleware/users/currentUser.js";

const authRoutes = express.Router();


// Connection routes

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/connect", connect);

// Verification routes

authRoutes.get('/verification', verification)

// Authentification routes

authRoutes.get("/admin", admin);

// Forgot password

authRoutes.post("/forgot", forgot);

// Get users

authRoutes.get("/user", user)
authRoutes.post("/change-role", changeRole)
authRoutes.get("/delete-user/:id", deleteUser)
authRoutes.get("/current-user", currentUser)

export default authRoutes;

