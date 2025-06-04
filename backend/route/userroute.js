import express from "express";
import { registerUser, loginUser, updateUserProfile, getAllUsers } from "../controller/usercontroller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", updateUserProfile);
router.get("/debug/data/user", getAllUsers);

export default router;
