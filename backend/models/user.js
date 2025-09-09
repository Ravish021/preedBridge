import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    userName:
    {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // CollegeName:{
    //     type:String,
    //     required:true,
    // },
    role:{
        type:String,
        default:"General",
    },
    // tier:{
    //     type:String,
    //     required:true,
    // },
    // year:{
    //     type:Number,
    //     required:true,
    // },
    lastLogin:{
        type:Date,
        default:Date.now,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,
},{
    timestamps:true,
});
const User = mongoose.model("User",userSchema);
export default User;