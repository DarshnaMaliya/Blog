import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {Box, TextField, Button, InputLabel, Typography} from "@mui/material";
const BlogDetail = () => {
    const navigate = useNavigate();
    const[blog, setBlog] = useState();
    const id = useParams().id;
    console.log(id);
    const [inputs, setInputs] = useState({
        title:"",
        description:""
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const fetchDetails = async () => {
        const res = await axios.get(`http://localhost:5010/api/blog/${id}`).catch(err=>console.log(err));
        const data = await res.data;
        return data;
        };
    useEffect(()=>{
        fetchDetails().then((data) => {
        setBlog(data.blog);
        setInputs({
            title:data.blog.title,
            description:data.blog.description,
            image:data.blog.image
        });

    });
    },[id]);
    const sendRequest = async () => {
        const res = axios.put(`http://localhost:5010/api/blog/update/${id}`, {
            title : inputs.title,
            description : inputs.description,
            image:inputs.image
        }).cathc(err=>console.log(err));
        const data = await res.data;
        return data;
    }
    console.log(blog);
    const handleSubmit=(e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data => console.log(data)).then(navigate("/")).then(navigate('/blogs/'));
    };
return(
    <div>
         <form onSubmit={handleSubmit}>
            <Box border={3} borderColor="purple" borderRadius={10} 
            boxShadow="10px 10px 10px #ccc" padding={3} margin={"auto"} marginTop={3} display='flex' 
            flexDirection={"column"} width={"80%"}>
                <Typography variant="h2" fontWeight={'bold'} padding={2} color="purple" align="center">Write Your Blog</Typography>
                <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Title</InputLabel>
                <TextField name="title" value={inputs.title} onChange={handleChange} margin="normal" variant="outlined"/>
                <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Description</InputLabel>
                <TextField name="description" value={inputs.description} onChange={handleChange} margin="normal" variant="outlined"/>
                <InputLabel sx={{mb:1, mt:2, fontSize:'24px', fontWeight:'bold'}}>Image</InputLabel>
                <TextField name="image" value={inputs.image} onChange={handleChange} margin="normal" variant="outlined"/>
                <Button type="submit" variant="contained" color="warning" sx={{mt:2, bordereRadius:4}}> Update Blog</Button>
            </Box>
        </form>
    </div>
)
}


export default BlogDetail;