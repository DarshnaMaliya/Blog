import express from "express";
import getAllUser from "../controllers/userController.js";
import { signUp,login } from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup",signUp);
router.post("/login", login);


export default router;