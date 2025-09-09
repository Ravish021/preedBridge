import userProfileModel  from "../models/userProfile.js";
export const currUserProfile = async (req,res)=>{
    try{
        
        const userProfile = await userProfileModel.findOne({userId:req.userId});
        console.log("userProfile:",userProfile);
        if(!userProfile){
            return res.status(404).json({
                message:"User profile not found",
                success:false,
                error:true,
            })
        }
        return res.status(200).json({
            message:"User profile set successfully",
            success:true,
            error:false,
            data:userProfile,
        })
    }catch(err){
        return res.status(400).json({
            message: "Error in server side user profile" ||err.message ,
            error:true,
            success:false,
        })
    }
}

