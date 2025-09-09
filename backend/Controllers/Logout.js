export const Logout = async(req,res)=>{
    try{
        res.clearCookie("token");
        res.status(200).json({
            message:"Logout successfully",
            success:true,
            error:false,
        })
    }catch(err){
        console.log("Error in logout:",err);
        res.status(500).json({
            message:"Error in logout",
            success:false,
            error:true,
        })
    }
}