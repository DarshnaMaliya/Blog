import express from "express";
import getAllBlogs, { addBlog, updateBlog, getById, deleteBlog, getByUserId, getLike, getUnlike, getAllInFile } from "../controllers/blogController.js";
const router1 = express.Router();
export const router2 = express.Router();

router1.get("/", getAllBlogs);
router1.post("/add", addBlog);
router1.put("/update/:id",updateBlog);
router1.get("/:id", getById);
router1.delete("/:id", deleteBlog);
router1.get("/user/:id", getByUserId);
router1.put("/like/:id", getLike);
router1.put("/unlike/:id", getUnlike);
router2.get("/", getAllInFile);
export default router1;