import React from "react";
import { Typography, Card, CardContent, CardMedia, CardHeader, Avatar, IconButton, Box } from "@mui/material";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import { useNavigate } from "react-router-dom";

const Blog = ({title, description, image, user, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit =() => {
navigate(`/myblogs/${id}`);
  }
  const handleDelete = () => {

  }
  console.log(title,isUser,id);
    return <div>
        {" "}
        <Card sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc",

            }}>
              {isUser && (
                <Box display='flex'>
<IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}> <BorderColorTwoToneIcon/></IconButton>
<IconButton onClick={handleDelete}> <DeleteOutlineTwoToneIcon/></IconButton>
                </Box>
              )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="blog">
            {user.charAt(0)}
          </Avatar>
        }
        
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="blog"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
           {user} { ":" }{description} 
        </Typography>
      </CardContent>
    </Card>
    </div>
};

export default Blog;