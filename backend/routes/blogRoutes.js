import express from "express";
import getAllBlogs, { addBlog, updateBlog, getById, deleteBlog, getByUserId } from "../controllers/blogController.js";
 const router1 = express.Router();

router1.get("/", getAllBlogs);
router1.post("/add", addBlog);
router1.put("/update/:id",updateBlog);
router1.get("/:id", getById);
router1.delete("/:id", deleteBlog);
router1.get("/user/:id", getByUserId);

;export default router1;