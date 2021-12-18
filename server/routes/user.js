import express from "express";
const router = express.Router();

import { signUp, signIn } from "../controllers/user/index.js";

router.post("/signin", signIn);
router.post("/signup", signUp);

export default router;