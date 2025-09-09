
import UserModel from "../models/user.js"; // Import the UserModel
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { generateTokenAndSetCookie } from "../helper/generateTokenAndSetCookie.js"; // Import the function to generate JWT and set cookie
import { sendVerificationEmail } from "../mailtrap/email.js"; // Import the function to send verification email


export const Signup = async(req, res) => {
    try{
        const { email, userName, password } = req.body; // Destructure the request body
        console.log("Request Body:", req.body); 

        if(!email){
            throw new Error("Email is required");
        }
        if(!userName){
            throw new Error("Username  is required");
        }
        if(!password){
            throw new Error("Password  is required");
        }
       
        const user = await UserModel.findOne({userName});  // Check if the user already exists in the database
        console.log("User:", user);                      // Log the user object for debugging
        if(user){
            throw new Error("User already exists");
        }

        
        const salt =  bcrypt.genSaltSync(10); // Generate a salt for hashing
        const hashPassword =  bcrypt.hashSync(password, salt); // Hash the password with the salt
        const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random verification token

        if(!hashPassword){
            throw new Error("Password hashing failed");
        }

        const payload = {    // Create a payload object with user data
            ...req.body,   
            password: hashPassword, 
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,  // Set the token expiration time to 24 hours from now
            lastLogin: Date.now(), // Set the last login time to now
        }
        
        console.log("Payload:", payload); 

        const userData = await UserModel.create(payload); // Create a new user in the database and save the data
        console.log("User Data:", userData);
        if(!userData){
            throw new Error("User data not saved");
        }
        //jwt

        generateTokenAndSetCookie(res,userData._id);
        
        await sendVerificationEmail(userData.email,userData.name,verificationToken); // Send a verification email to the user

        res.status(200).json({
            message:"User created successfully",
            error:false,
            success:true,
            data:userData
        })
    }catch(err){
        console.error("Error in Singup Controller:",err.message);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        })
    }
  };