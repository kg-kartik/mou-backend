import express from "express";
import {getUserById, signin} from "../controllers/authController";
const router = express.Router();

router.post("/signin",signin);
router.post("/getUser",getUserById);

export default router;