import express from "express";
const router = express.Router();

import { enterEmail, enterPassword } from "../controllers/password/index.js";

router.post("/enter-email", enterEmail);
router.post("/enter-new-password/:userId/:token", enterPassword);

export default router;