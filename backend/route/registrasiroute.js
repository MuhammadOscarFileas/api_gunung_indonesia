import express from "express";
import { createRegistrasi, getAllRegistrasi, updateStatusRegistrasi} from "../controller/registrasicontroller.js";
import { getHistory } from "../controller/historyController.js";
import { getHistoryDetail } from "../controller/detailHistorycontroller.js";

const router = express.Router();

// Buat registrasi pendakian baru
router.post("/create", createRegistrasi);

router.get("/", getAllRegistrasi);

router.patch("/registrasi/:id/status", updateStatusRegistrasi);

// Ambil history registrasi user (bisa pakai user ID dari auth middleware)
router.get("/history/:userId", getHistory);

// Detail history registrasi berdasarkan ID registrasi
router.get("/historydetail/:id", getHistoryDetail);

export default router;
