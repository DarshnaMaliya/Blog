import React from "react";
import { Typography, Card, CardContent, CardMedia, CardHeader, Avatar, IconButton, Box, Button, TextField} from "@mui/material";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Blog = ({title, description, image, user, isUser, id }) => {
  const navigate = useNavigate();

const handleEdit =() => {
navigate(`/myblogs/${id}`);
  }
const deleteRequest = async () => {
 const res = await axios.delete(`http://localhost:5010/api/blog/${id}`).catch(err=>console.log(err));
 const data = await res.data;
 return data;
  }
  const handleDelete = () => {
  deleteRequest().then((data)=>console.log(data));
  }
  console.log(title,isUser,id);
    return <div>
        {" "}
        <Card sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc",

            }}>
              {isUser && (
                <Box display='flex'>
<IconButton onClick={handleEdit} sx={{marginLeft:'auto'}} color="warning"> <BorderColorTwoToneIcon/></IconButton>
<IconButton onClick={handleDelete} color="error"> <DeleteOutlineTwoToneIcon/></IconButton>
                </Box>
              )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="blog">
            {user.charAt(0)}
          </Avatar>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="blog"
      />
     
      <CardContent>
        <hr />
        <br />
        <Typography variant="body2" color="text.secondary">
           {user} { ":" }{description} 
        </Typography>
      </CardContent>
    </Card>
    <Box sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc"}} display="flex" flexDirection={"row"}>
      {/* <TextareaAutosize placeholder="whats on your mind"></TextareaAutosize> */}
      <TextField fullWidth placeholder="whats on your mind" />
      <Button variant="contained" sx={{marginLeft:"auto"}}>post</Button>
    </Box>
    </div>
};

export default Blog;