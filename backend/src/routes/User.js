import express from "express";
import { UserRegister, UserLogin, getDashboard } from "../controllers/User.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.get("/dashboard", verifyToken, getDashboard);

export default router;
