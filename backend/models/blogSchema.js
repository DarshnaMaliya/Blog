import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref:"BlogUser",
        required : true
    },
    likes: [{type : mongoose.Schema.Types.ObjectId, ref : "BlogUser"}]
         
});

export default mongoose.model("Blog", blogSchema);