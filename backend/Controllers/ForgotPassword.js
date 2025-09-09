import userModel from "../models/user.js";
import crypto from "crypto";
import { sendPasswordResetEmail,sendPasswordResetSuccessEmail } from "../mailtrap/email.js"; 
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing

export const ForgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("user not found with this email");
        }
        // Generate a random token for password reset
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiration = Date.now() + 10 * 60 *1000; // 10 minutes

        // Hash the token and save it to the database
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiration;

        await user.save();

        await sendPasswordResetEmail(user.email,user.name ,`${process.env.Client_URL}/resetPassword/${resetToken}`); // Function to send email with the reset link
        res.status(200).json({
            message:"Password reset email sent successfully",
            success:true,
            error:false,
        })


    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:err.message ||"Internal server error",
            success:false,
            error:true,
        })
    }

}

export const resetPassword = async (req, res) => {
    const {password} = req.body;
    const {token} = req.params;

    try{
        const user =await userModel.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt: { $gt: Date.now() } 
        });
        if(!user){
            throw new Error("Invalid or expired password reset token");
        }

        // Hash the new password and save it to the database
        const hashedPassword = await bcryptjs.hash(password, 10); // Hash the new password with bcrypt
        user.password = hashedPassword; 
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined; 

        await user.save();
        await sendPasswordResetSuccessEmail(user.email,user.name)
        res.status(200).json({
            message:"Password reset successfully",
            success:true,
            error:false,
        })  
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:err.message ||"Internal server error",
            success:false,
            error:true,
        })
    }
}