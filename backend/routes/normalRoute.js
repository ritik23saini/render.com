import express from "express"
import { login, logout } from "../controllers/adminController.js";

export const normalRoute = express.Router();


normalRoute.post("/login",login);
normalRoute.post("/logout", logout); 