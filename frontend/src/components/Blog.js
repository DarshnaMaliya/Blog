import React from "react";
import { Typography, Card, CardContent, CardMedia, CardHeader, Avatar } from "@mui/material";
const Blog = ({title, description, image, user}) => {
    return <div>
        {" "}
        <Card sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc",

            }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="blog">
            {user}
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