import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const UserBlogs = () => {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userId");
    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:5010/api/blog/user/${id}`).catch(err=>console.log(err));
        console.log(res);
        const data = await res.data;
        console.log(data);
        return data;
    };
    useEffect(() => {
        sendRequest().then((data) => setUser(data.user))
    },[])
    console.log(user);
    return (
        <div>
            {user && user.blogs && user.blogs.map((blog, index) => {
        return <Blog
        id={blog._id}
        key={index} 
        isUser ={true}
        title={blog.title} 
        description={blog.description}
        image={blog.image} 
        user={user.name}/>
        })     
        }  
        </div>
    )
}


export default UserBlogs;