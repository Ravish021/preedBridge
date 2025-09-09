import UserProfile from "../models/userProfile.js";

export const profile = async(req,res)=>{
    try{
        const {email,name,image,CollegeName,tier,year,userId,color} = req.body;
        console.log("Request Body:", req.body);
        if(!email) throw new Error("Email is required");
        if(!name) throw new Error("Name is required");
        if(!CollegeName) throw new Error("College Name is required");   
        if(!tier) throw new Error("Tier is required");
        if(!year) throw new Error("Year is required");

        

        const userProfile = await UserProfile.findOne({ $or:[{ userId },{ email }]});
        if(!userProfile){
            console.log("User profile not found, creating a new one");
        }
        const profileData = {
            email,
            name,
            CollegeName,
            tier,
            year,
            image:  image || [],
            userId,
            color,
        };
        let setProfile;
        if(!userProfile){
            setProfile = await UserProfile.create(profileData);
        }else{
            setProfile = await UserProfile.findOneAndUpdate({ email },
                {$set: profileData},
                {new:true,upsert:true, runValidators:true} 
            );
        }
        console.log("Profile Data:", setProfile);
        return res.status(200).json({
            message:"Profile set successfully",
            error:false,
            success:true,
            data:setProfile
        });

        

    }
    catch(error){
        console.error("Error in profile: ",error.message);
        res.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        })
    }
}
