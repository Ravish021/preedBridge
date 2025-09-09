import UserProfileModel from "../../models/userProfile.js";
import ChannelModel from "../../models/channelModel.js";
export const Channel = async(req,res)=>{
    try{
        // console.log("Creating channel with request body:", req.body);
        const {channelName ,members} = req.body;
        // console.log("Creating channel with name:", channelName, "and members:", members);

        const user = req.userId;
        const userProfile = await UserProfileModel.findOne({userId:user});
        
        const admin = await UserProfileModel.findById(userProfile._id);
        // console.log("Admin:", admin);
        
        if(!admin) throw new Error("Admin not found");
        
        const validMembers = await UserProfileModel.find({_id: { $in: members }});

        if(validMembers.length !== members.length) {
            return res.status(400).json({
                message: "Some members are not valid users",
                success: false,
                error: true
            });
        }

        const newChannel = await ChannelModel.create({
            channelName,
            members,
            admin: admin._id
        })

       
        console.log("New Channel Created:", newChannel);

        return res.status(201).json({
            channel: newChannel,
            success: true,
            error: false
        });



    }catch(err){
        console.log("Error in creating channel:", err);
        res.status(500).json({
            message: err.message || "Error in creating channel",
            success: false,
            error: true
        });
    }
}

export const getUserChannels = async(req,res)=>{
    try{
        

        const user = req.userId;
        console.log("User ID:", user);
        const userProfile = await UserProfileModel.findOne({userId:user});
        
        const userChannel = await UserProfileModel.findById(userProfile._id);

        
        const channels = await ChannelModel.find({
            $or:[
                {admin: userChannel._id},{members: userChannel._id}
            ]
        }).sort({updatedAt:-1})
        console.log("User Channels:", channels);


        return res.status(201).json({
            channel: channels,
            success: true,
            error: false
        });

    }catch(err){
        console.log("Error in creating channel:", err);
        res.status(500).json({
            message: err.message || "Error in creating channel",
            success: false,
            error: true
        });
    }
}

export const getChannelMessages = async(req,res)=>{
    try{
    const {channelId} = req.params;
    const channel = await ChannelModel.findById(channelId).populate({
        path:"messages",
        populate:{
            path:"sender",
            select:"name email CollegeName image color tier year",
        }
    });
    if(!channel) {
        return res.status(404).json({
            message: "Channel not found",
            success: false,
            error: true
        });
    }
    return res.status(200).json({
        messages: channel.messages,
        success: true,
        error: false
    });
}catch(err){
    console.log("Error in Channel messages:", err);
    return res.status(500).json({
        success: false,
        error: true,
        messages: err.message || "Error in Channel messages" 
    })
}
}