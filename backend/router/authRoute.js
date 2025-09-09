import express from 'express';
const router = express.Router();

import { Signup } from '../Controllers/Signup.js';
import {EmailVerify} from '../Controllers/EmailVerify.js';
import { Logout } from '../Controllers/Logout.js';
import {Login} from '../Controllers/Login.js';
import { ForgotPassword,resetPassword } from '../Controllers/ForgotPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkAuth } from '../Controllers/checkAuth.js';
import { currentUser } from '../Controllers/currentUser.js';
import { profile } from '../Controllers/profile.js';
import { currUserProfile } from '../Controllers/CurrUserProfile.js';
import { getAllContactsForDM, searchUser,getAllContactsChannels } from '../Controllers/ContactControllers/contactController.js';
import { messageController } from '../Controllers/ContactControllers/messageController.js';
import { Channel } from '../Controllers/ContactControllers/channel.js';
import { getUserChannels } from '../Controllers/ContactControllers/channel.js';
import { getChannelMessages } from '../Controllers/ContactControllers/channel.js';
import {PostCreate} from '../Controllers/post.js';

router.get("/check-auth",verifyToken,checkAuth); 
router.post('/Signup',Signup);
router.post('/login',Login);
router.post('/logout',Logout);  
router.post('/email-verify', EmailVerify);  
router.post('/forgot-password',ForgotPassword); 
router.post('/forgot-password/:token',resetPassword); 
router.get('/current-user',verifyToken,currentUser);
router.post('/user-profile',verifyToken,profile);
router.get('/curr-user-profile',verifyToken,currUserProfile);

router.post('/search',verifyToken,searchUser);
router.get('/get-all-contacts-for-dm',verifyToken,getAllContactsForDM);




router.get('/get-messages',verifyToken,messageController);

//channels
router.get('/get-all-contacts-channels',verifyToken,getAllContactsChannels);
router.post('/create-channel',verifyToken,Channel);
router.get('/get-User-Channels',verifyToken,getUserChannels);
router.get('/get-channel-messages/:channelId',verifyToken,getChannelMessages);

//posts
router.post('/create-post',verifyToken,PostCreate);

export default router;
