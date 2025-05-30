import express from "express";
import { addGunung, getAllGunung, editGunung, deleteGunung, getNearestGunung } from "../controller/createGunung.js";
import { getGunungDetail } from "../controller/detailGunungcontroller.js";

const router = express.Router();

router.post("/create", addGunung);
router.get("/", getAllGunung);
router.put("/edit/:id", editGunung);
router.delete("/delete/:id", deleteGunung);
router.get("/details/:id", getGunungDetail);
router.get("/nearest", getNearestGunung);

export default router;
