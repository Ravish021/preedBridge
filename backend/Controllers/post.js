import Post from '../models/postModel.js'
export const PostCreate = async(req,res)=>{
    const {userName,userId,content} = req.body;
    try{
        const data  = {
            userName,
            userId,
            content 
        }
        const newPost = await Post.create(data);
        res.status(201).json({
            message: "Post created successfully",
            success: true,
            error: false,
            data: newPost
        });

    }catch(err){
        res.status(500).json({
            message: err.message || "Error in server side post controller",
            success: false,
            error: true
        });
    }
}