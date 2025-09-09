import userModel  from "../models/user.js";
export const currentUser = async (req,res) => {
    try{
        // console.log("req.userId in curr User:",req.userId);
        const user = await userModel.findById(req.userId);
        if(!user){
            res.status(404).json({
                message:"Current user not found",
                success:false,
                error:true,
            })
        }
        res.status(200).json({
            message:"Current user fetched successfully",
            success:true,
            error:false,
            data:user,
        })
    }catch(err){
         res.status(400).json({
            message:err.message || "Error in server side current user",
            error:true,
            success:false,
        })
    }
}
// module.exports = currentUser;