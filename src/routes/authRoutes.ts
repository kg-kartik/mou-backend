import express from "express";
import {getUserById, signin, signup} from "../controllers/authController";
const router = express.Router();

router.post("/signin",signin);
router.post("/getUser",getUserById);
router.post("/signup",signup);

export default router;