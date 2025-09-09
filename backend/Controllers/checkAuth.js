import userModel  from "../models/user.js";

export const checkAuth = async (req, res) => {
    try{
        const user = await userModel.findById(req.userId).select("-password -resetPasswordToken -resetPasswordExpiresAt"); // Exclude password from the response
        if(!user){
            return res.status(401).json({
                message:"User not found",
                success:false,
                error:true,
            });
        }
        return res.status(200).json({
            message:"User found",
            success:true,
            error:false,
            user:user,  // Send the user data in the response
        });

    }catch(err){
        console.log("error in checkAuth:",err);
        return res.status(500).json({
            message:"Error in checkAuth"+" " + err.message,
            success:false,
            error:true,
        });
    }
}