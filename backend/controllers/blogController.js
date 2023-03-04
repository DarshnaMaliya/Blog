import mongoose from "mongoose";
import blogSchema from "../models/blogSchema.js";
import userSchema from "../models/userSchema.js";
import BlogUser from "../models/userSchema.js";

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await blogSchema.find().populate("user");
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "no blogs found" });
    }
    return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await BlogUser.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable to find user by this id" });
    }
    const blog = new blogSchema({
        title,
        description,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
    return res.status(200).json({ blog });
};
export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await blogSchema.findByIdAndUpdate(blogId, {
            title,
            description
        });
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update blog" });
    }
    return res.status(200).json({ blog });
}

export const getById = async(req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let blog;
    try {
        blog = await blogSchema.findById(id).populate('user');
        //console.log(blog);
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable to find blog by this id" });
    }
    return res.status(200).json({ blog });
}
export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await blogSchema.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "unable to delete" });
    }
    return res.status(200).json({ message: "deleted successfully" });
}
export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    //console.log(userId);
    let userBlogs;
    try {
        userBlogs = await userSchema.findById(userId).populate('blogs');
        //console.log(userBlogs);
    } catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "NO BLOG FOUND" });
    }
    return res.status(200).json({ user: userBlogs });
}
export default getAllBlogs;