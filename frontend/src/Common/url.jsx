import { get } from "mongoose";

const backendDomin= import.meta.env.VITE_BACKEND_URL 

const SummaryUrl = {
    SignUp:{
        url:`${backendDomin}/api/signup`,
        method:"POST",
    },
    Login:{
        url:`${backendDomin}/api/login`,
        method:"POST",
    },
    userLogOut:{
        url:`${backendDomin}/api/logout`,
        method:"POST",
    },
    EmailVerify:{
        url:`${backendDomin}/api/email-verify`,
        method:"POST",
    },
    currUserDetails:{
        url:`${backendDomin}/api/current-user`,
        method:"GET",
    },
    Userprofile:{
        url:`${backendDomin}/api/user-profile`,
        method:"POST",
    },
    currUserProfile:{
        url:`${backendDomin}/api/curr-user-profile`,
        method:"GET",
    },
    searchContact:{
        url:`${backendDomin}/api/search`,
        method:"POST",
    },
    getMessages:{
        url:`${backendDomin}/api/get-messages`,
        method:"GET",
    },
    getAllContactsForDM:{
        url:`${backendDomin}/api/get-all-contacts-for-dm`,
        method:"GET",
    },
    getAllContactsChannels:{
        url:`${backendDomin}/api/get-all-contacts-channels`,
        method:"GET",
    },
    createChannel:{
        url:`${backendDomin}/api/create-channel`,
        method:"POST",
    },
    getUserChannels:{
        url:`${backendDomin}/api/get-User-Channels`,
        method:"GET",
    },
    getChannelMessages:{
        url:`${backendDomin}/api/get-channel-messages`,
        method:"GET",
    },
    createPost:{
        url:`${backendDomin}/api/create-post`,
        method:"POST",
    }
}

export default SummaryUrl;