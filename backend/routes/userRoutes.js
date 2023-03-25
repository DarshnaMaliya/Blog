import express from "express";
import getAllUser from "../controllers/userController.js";
import { signUp,login, exportFile} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup",signUp);
router.post("/login", login);
router.get("/file", exportFile);


export default router;