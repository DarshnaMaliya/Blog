import { useState } from "react";
import { Typography, Card, CardContent, CardMedia, CardHeader, Avatar, IconButton, Box} from "@mui/material";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Blog = ({title, description, image, user, isUser, id, likes }) => {
const navigate = useNavigate();

// const[like,setLike] = useState(likes);
 const [isLike, setIsLike] = useState(null);

// console.log(likes);
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

  const likePost = async () => {
  const res = await axios.put(`http://localhost:5010/api/blog/like/${id}`).catch(err => console.log(err));
  const data = res.data;
  //return data;
  console.log(data);
}

const UnlikePost = async () => {
  const res = await axios.put(`http://localhost:5010/api/blog/unlike/${id}`).catch(err => console.log(err));
  const data = res.data;
  //return data;
  console.log(data);
}
const handleClick = () => {
  // setLike(like + (isLike? -1:1));
  // isLike ? 
  // likes = likes - 1: 
  // likes = likes + 1;
 // setIsLike(!isLike);
  (!isLike) ?
  likePost().then((data) => setIsLike(!isLike))
  :
  UnlikePost().then((data) => setIsLike(!isLike))
}
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
          <br />
          {!isLike ? <ThumbUpOffAltIcon sx={{ marginLeft: "10px" }} color="primary" onClick={handleClick} /> :
            <ThumbUpOffAltIcon sx={{ marginLeft: "10px" }} color="grey" onClick={handleClick} />
          }
          <span> Likes : {likes} </span>
  </CardContent>
      </Card>
   
    <Comments/>
    </div>
};

export default Blog;