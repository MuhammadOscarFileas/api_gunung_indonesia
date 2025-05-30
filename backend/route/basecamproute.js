import express from "express";
import { addBasecamp, getBasecampByGunung, editBasecamp, deleteBasecamp } from "../controller/createBasecamp.js";

const router = express.Router();

router.post("/create", addBasecamp);
router.get("/:gunung_id", getBasecampByGunung);
router.put("/edit/:id", editBasecamp);
router.delete("/delete/:id", deleteBasecamp);

export default router;
