import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Empty } from 'antd';
import ContactsContainer from './components/contacts-containers/ContactContainers';
import EmptyChatContainer from './components/Empty-chat-containers/EmptyChatCont'; 
import ChatContainers from './components/Chat-containers/ChatContainers';

export const Chat = () => {

  const user = useSelector((state) => state?.user?.user)
  const userProfile = useSelector((state) => state?.user?.profile);
  const {selectedChatType} = useSelector((state) => state.chat); // Accessing selectedChatType from chat slice
  // console.log("User Profile:", userProfile);

  useEffect(() => {
    if(!userProfile){
    toast("Please complete your profile to access the chat feature.", {
      type: "info",
      autoClose: 3000,
      theme: "dark",
    });
  }
  }, [userProfile]);

  return (
    <div className='flex h-screen w-full bg-gray-900 overflow-hidden'>
      <ContactsContainer />
      {
        selectedChatType === null ?(
          <EmptyChatContainer /> 
        ):(
          <ChatContainers />
        )
      }
     
    </div>
  )
}
