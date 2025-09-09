import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserProfile",
        required: true
    },
    content:{
        type: String,
        required: true
    },

}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);
export default Post;