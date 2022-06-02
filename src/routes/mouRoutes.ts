import express from "express";
import { requireLogin } from "../middlewares/requireLogin";
import { addMou, getAllMous, getUserMous, updateStatus } from "../controllers/mou";
const router = express.Router();

router.post("/addMou",requireLogin,addMou);
router.post("/updateStatus",requireLogin,updateStatus);
router.get("/getAllMous",requireLogin,getAllMous);
router.get("/getUserMous",requireLogin,getUserMous);

export default router;