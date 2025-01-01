import express from "express";
import { insertNewUser } from "../controllers/authController.js";
const router = express.Router();

// User siignup
router.post("/register", insertNewUser);

export default router;
