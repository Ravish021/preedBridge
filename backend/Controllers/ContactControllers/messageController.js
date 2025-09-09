import MessageModel from "../../models/messages.js";
import UserProfileModel from "../../models/userProfile.js";

export const messageController = async (req,res)=>{
    try {
        
        const user = req.userId; 

        const userProfile  = await UserProfileModel.findOne({userId:user});
        
        
        const user1 = userProfile._id;
        const user2 = req.query.id;

        if(!user1 || !user2) throw new Error("User ID is required");
        if (user1.equals(user2)) throw new Error("You cannot send message to yourself");

        const messages = await MessageModel.find( { // Find messages between two users
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({createdAt: 1});

        // console.log("Messages from backend:", messages);

        return res.status(200).json({
            messages,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message:error.message ||"Error in server side message controller",
            success: false,
            error: true
        
        });
    }
}


