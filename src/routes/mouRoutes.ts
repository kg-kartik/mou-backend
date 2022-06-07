import express from "express";
import { requireLogin } from "../middlewares/requireLogin";
import { addAnswer, addMou, addQuestion, getAllMous, getMouById, getUserMous, updateStatus } from "../controllers/mou";
const router = express.Router();

router.post("/addMou",requireLogin,addMou);
router.post("/updateStatus",requireLogin,updateStatus);
router.get("/getAllMous",requireLogin,getAllMous);
router.get("/getUserMous",requireLogin,getUserMous);
router.post("/addQuestion",requireLogin,addQuestion);
router.post("/addAnswer",requireLogin,addAnswer);
router.post("/getAMou",getMouById);

export default router;