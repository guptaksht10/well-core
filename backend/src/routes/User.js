import express from "express";
import { UserRegister, UserLogin } from "../controllers/User.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserDashboard, getWorkoutsByDate, addWorkout } from "../controllers/User.js";

const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

export default router;
