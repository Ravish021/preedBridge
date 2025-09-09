import { mongo } from "mongoose";
import userProfileModel from "../../models/userProfile.js";
import Message from "../../models/messages.js";

 const searchController = async (req,res)=>{
    try {
        const {searchTerm} = req.body;
        if(!searchTerm) throw new Error("Search Term is required ");

        const sanitarizedSearchValue = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
        const regex = new RegExp(sanitarizedSearchValue,'i'); // 'i' for case-insensitive search\
        
        const contact = await userProfileModel.find({
            $and:[{ _id: { $ne: req.userId }},{    
            $or: [
                { name: { $regex: regex } }, // Search by name
                { userName: { $regex: regex } }, // Search by username
                { email: { $regex: regex } } // Search by email
            ]
        }
    ]});

        return res.status(200).json({
            contact,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message:error.message ||"Error in server side contact controller",
            success: false,
            error: true
        
        });
    }
}
export { searchController as searchUser }; 

export const getAllContactsForDM = async (req,res)=>{    // This is for who is recently messaged and show them in the DM section
    try {
        
        const user = req.userId;
        const userProfile = await userProfileModel.findOne({userId: user});
        const userId = userProfile._id;
        const contacts = await Message.aggregate([
            {
                $match:{
                    $or:[
                        {sender:userId},{receiver:userId}
                    ]
                }
            },{$sort: {createdAt: -1}},
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{$eq:["$sender", userId]},
                            then:"$receiver",
                            else:"$sender"
                        }
                    },
                    lastMessageTime:{$first:"$createdAt"},
                }
            },
            { 
                $lookup:{
                    from:"userprofiles",
                    localField:"_id",
                    foreignField:"_id",
                    as:"contactInfo"
                }
            },
            {
                $unwind:"$contactInfo"
            },
            { 
                $project:{                      
                    _id:1,
                    name:"$contactInfo.name",
                    email:"$contactInfo.email",
                    profilePicture:"$contactInfo.profilePicture",
                    image:"$contactInfo.image",
                    lastMessageTime:1,
                    color: "$contactInfo.color",
                    tier: "$contactInfo.tier",
                    year: "$contactInfo.year",
                    CollegeName: "$contactInfo.CollegeName",
                }
            },
            { $sort: { lastMessageTime: -1 } } 
        ])
        return res.status(200).json({
            contacts,
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error in getAllContacts:", error);
        res.status(500).json({
            message:error.message || "Error in server side getAllContacts",
            success:false,
            error:true
        })
    }
}


export const getAllContactsChannels = async (req,res)=>{ 
    try {
        const users = await userProfileModel.find({_id: {$ne:req.userId}},"_id name email"); 
        console.log("Users:", users);
        // const {searchTerm} = req.body;
        // if(!searchTerm) throw new Error("Search Term is required ");

        // const sanitarizedSearchValue = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
        // const regex = new RegExp(sanitarizedSearchValue,'i'); // 'i' for case-insensitive search\
        
        const contacts = users.map((user)=>({
            label: user.name ? user.name : user.email,
            value: user._id,
        }))

        return res.status(200).json({
            contacts,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message:error.message ||"Error in server side contact controller",
            success: false,
            error: true
        
        });
    }
}



