import { InputLabel, TextField, Typography , Box, Button} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title :"",
        description:"",
        image:""
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
const handleSubmit = (e) => {
e.preventDefault();
console.log(inputs);
sendRequest().then(data=> console.log(data)).then(navigate("/blogs"));
    };
    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5010/api/blog/add", {
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:localStorage.getItem("userId")
        })
        .catch(err => console.log(err));
        const data = await res.data;
        return data;
        }
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
                <Button type="submit" variant="contained" color="warning" sx={{mt:2, bordereRadius:4}}> Add Blog</Button>
            </Box>
        </form>
    </div>
)
}


export default AddBlog;