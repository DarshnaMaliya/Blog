import express from "express";
import mongoose from "mongoose";
import router1 from "./routes/blogRoutes.js";
import router from "./routes/userRoutes.js";
import { router2 } from "./routes/blogRoutes.js";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", router1);
app.use("/api",router2);
mongoose.connect("mongodb+srv://Darshna:399ixQwgeVLUAr95@darshna-cluster-1.0qbhmgk.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("Connected to Database"))

app.listen(5010, () => {
    console.log("Server running on port 5010");
})