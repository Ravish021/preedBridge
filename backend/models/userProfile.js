import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    CollegeName:{
        type: String,
        required: true
    },
    tier:{
        type: Number,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    image:[],
    userId:{
        type:String,
        required: true, 
        unique: true
    },
    color:{
        type: String,
        default: "#000000" 
    }

})
const UserProfile = mongoose.model("UserProfile",UserProfileSchema);
export default UserProfile;