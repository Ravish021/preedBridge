import { mailtrapClient,sender } from "./mailtrapConfig.js"
import {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from "../mailtrap/emailTemplate.js"


export const sendVerificationEmail = async (email,name, verificationToken) => {
    const recipient = [{email}]
    console.log("Recipient:", recipient);
    
    try{
        const htmlCountent = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken).replace("{name}", name);
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient, 
            subject:"Verify your email",
            html: htmlCountent,
            category:"Email Verification", 
        })
        console.log("Email sent successfully:", response);
    }catch(err){
        console.error("Error sending email:", err);
        throw new Error("Failed to send verification email: " + err.message);
    }
}

export const sendWelcomeEmail = async (email,name)=>{
    const recipient  = [{email}];
    try{
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            // template_uuid: "28da33f3-e36f-4b8f-bf58-4552b5564881",
            template_uuid: "7d8b3a53-652b-45dd-af63-9d088eb1b59c",
            template_variables:{
                "name": name,
            }
        })
        console.log("Welcome email sent successfully:", response);
    }catch(err){
        console.error("Error sending email:", err);
        throw new Error("Failed to send welcome email: " + err.message);
    }
}

export const sendPasswordResetEmail = async (email,name,resetURL)=>{
    const recipient  = [{email}];
    try{
        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL).replace("{UserName}", name);
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your password",
            html:htmlContent,
            category:"Password Reset",
        })

    }catch(err){
        console.error("Error sending email:", err);
        throw new Error("Failed to send password reset email: " + err.message);
    }
}

export const sendPasswordResetSuccessEmail = async (email,name)=>{
    const recipient = [{email}];
    try{
        const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{UserName}", name);
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password reset successful",
            html:htmlContent,
            category:"Password Reset Success",
        })
    }catch(err){
        console.error("Error sending email:", err);
        res.status(500).json({
            message:"Failed to send password reset success email: " + err.message,
            success:false,
            error:true,
        });
    }
}