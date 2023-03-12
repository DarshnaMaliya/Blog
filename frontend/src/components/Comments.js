import React, { useState } from "react";
import {Box, TextField, Button} from "@mui/material";
// import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
const Comments = () => {
    const [comment, setComment] = useState('');
    const handleComment = () => {

    }
    return (
        
<Box sx={{ width: "40%" , margin:'auto', mt:2, padding:2, boxShadow:"5px 5px 10px #ccc"}} display="flex" flexDirection={"row"}>

            <TextField fullWidth placeholder="whats on your mind" />
      <Button variant="contained" sx={{marginLeft:"10px"}} onClick={handleComment}>post</Button>
      {/* <ThumbUpOffAltIcon sx={{marginLeft:"10px"}}/> */}
    </Box>
    
    )
}

export default Comments;

