import UserModel from "../models/user.js"; // Import the UserModel
import { sendWelcomeEmail } from "../mailtrap/email.js";

export const EmailVerify = async (req, res) => {
    const {code} = req.body; // Extract the verification code from the request body
    console.log("Verification code : ",code) 
    try{
        const user = await UserModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() } // Check if the token is still valid
        })

        if(!user){
            return res.status(400).json({
                message:"Invalid or expired verification code",
                success:false,
                error:true,
            });
        }

        user.isVerified = true; // Set the user's verification status to true
        user.verificationToken =  undefined; // Clear the verification token
        user.verificationTokenExpiresAt = undefined; // Clear the verification token and expiration time
        
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        return res.status(200).json({
            message:"Email verified successfully",
            success:true,
            error:false,

        });

        }catch(err){
        console.log("error in verifyEmail:",err);
        return res.status(500).json({
            message:"Error in email verification" + err.message,
            success:false,
            error:true,

        });
    }
}