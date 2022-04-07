import express from "express";
import { requireLogin } from "../middlewares/requireLogin";
import { addMou, updateStatus } from "../controllers/mou";
const router = express.Router();

router.post("/addMou",requireLogin,addMou);
router.post("/updateStatus",requireLogin,updateStatus);

export default router;