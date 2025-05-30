import express from "express";
import { createRegistrasi } from "../controller/registrasicontroller.js";
import { getHistory } from "../controller/historyController.js";
import { getHistoryDetail } from "../controller/detailHistorycontroller.js";

const router = express.Router();

// Buat registrasi pendakian baru
router.post("/create", createRegistrasi);

// Ambil history registrasi user (bisa pakai user ID dari auth middleware)
router.get("/history", getHistory);

// Detail history registrasi berdasarkan ID registrasi
router.get("/history/:id", getHistoryDetail);

export default router;
