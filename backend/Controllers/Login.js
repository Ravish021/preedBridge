import { generateTokenAndSetCookie } from "../helper/generateTokenAndSetCookie.js";
import  UserModel  from "../models/user.js";
import bcryptjs from "bcryptjs"; 

export const Login = async(req,res)=>{
    const {email,password} = req.body; // Extract email and password from the request body
    try{
        // Check if the user exists in the database
        const user = await UserModel.findOne({email}); 
        if(!user){
            throw new Error("User not found"); 
        }

        const isPasswordValid = await bcryptjs.compare(password,user.password); // Compare the provided password with the stored hashed password
        if(!isPasswordValid){
            throw new Error("Password required"); 
        }

        generateTokenAndSetCookie(res,user._id); // Generate a JWT and set it as a cookie in the response

        user.lastLogin = new Date(); 

        const userData = await user.save();

        console.log("User Data in login:", userData); // Log the user data for debugging

        return res.status(200).json({
            message:"Login successful",
            success:true,
            error:false,
            data:userData,  
        })

}catch(err){
        console.log("Error in login: ",err.message); // Log any errors that occur during the process
        return res.status(500).json({
            message: err.message,
            success:false,
            error:true,
        });
}

}