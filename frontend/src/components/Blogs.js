import React, {useEffect, useState} from "react";
import axios from "axios";
import Blog from "./Blog.js"
const Blogs = () => {
const[blogs, setBlogs] = useState();
const sendRequest = async () => {
const res = await axios.get("http://localhost:5010/api/blog")
.catch(err => console.log(err));
const data = await res.data;
return data;
}
useEffect(()=>{
sendRequest().then((data) => setBlogs(data.blogs));
    }, [])
    console.log(blogs)
    return(<div>
        { blogs && blogs.map((blog, index) => {
        return <Blog
        id = {blog._id} 
        isUser = {localStorage.getItem("userId") === blog.user._id}
        title={blog.title} description={blog.description} image={blog.image} user={blog.user.name}/>
        })     
        }      
    </div>);
};


export default Blogs;