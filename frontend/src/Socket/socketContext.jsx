import { useState } from 'react';
import { createContext,useContext,useEffect,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import  {addMessage} from '@/Store/chatSlice'; 
import {moveChannelToTop} from '@/Store/chatSlice';


const socketContext = createContext(null);

export const useSocket =()=>{
    return useContext(socketContext);
};

export const SocketProvider = ({children})=>{
    const socket = useRef(null);     
    const userProfile = useSelector((state) => state?.user?.profile); 

    const selectedChatType = useSelector((state) => state.chat.selectedChatType);
    const selectedChatData = useSelector((state) => state.chat.selectedChatData);
    // const [selectedChatType,selectedChatData] = useSelector((state) => [state.chat.selectedChatType, state.chat.selectedChatData]);

    const selectedChatTypeRef = useRef(selectedChatType);
    const selectedChatDataRef = useRef(selectedChatData);

    useEffect(() => {
    selectedChatTypeRef.current = selectedChatType;
    selectedChatDataRef.current = selectedChatData;
    }, [selectedChatType, selectedChatData]); 

    const dispatch = useDispatch();


    useEffect(()=>{
        if(userProfile){
            const newSocket = io(import.meta.env.VITE_BACKEND_URL,{
                withCredentials:true,
                query:{
                    userId: userProfile?._id
                },
            });

        socket.current = newSocket; 

        newSocket.on("connect",()=>{
            console.log("Connected to socket server");
        });

        newSocket.on("disconnect",()=>{
            console.log("Disconnected from socket server");
        });

        const handleReceiveMessage = (messageData)=>{
            try{
                const currentType = selectedChatTypeRef.current;
                const currentData = selectedChatDataRef.current;
                

                if (currentType !== undefined &&
                    currentData &&
                        (currentData._id === messageData?.sender?._id ||
                        currentData._id === messageData?.receiver?._id)
                    ) {
                        // console.log("Received message in the current chat:", messageData);
                        dispatch(addMessage(messageData));
                        dispatch(moveChannelToTop(messageData));
                } else {    
                    console.log("Received message in a different chat, not updating state:", messageData);
                    }
            }catch(error){
                console.error("Error handling received message:", error);
            }
            
        }
        const handleReceiveChannelMessage = (messageData)=>{
            const currentType = selectedChatTypeRef.current;
            const currentData = selectedChatDataRef.current;
            if (currentType === "channel" && currentData?._id === messageData?.channelId) {
                console.log("Received channel message in the current channel:", messageData);
                dispatch(addMessage(messageData));
            }

        }

        newSocket.on("receiveMessage",handleReceiveMessage);
        newSocket.on("receiveChannelMessage",handleReceiveChannelMessage)

        return()=>{
            if(newSocket){
                newSocket.disconnect();
                console.log("Socket disconnected");
            }
        }
    }
    },[userProfile,dispatch]);

    return (
        <socketContext.Provider value={socket.current}>
            {children}
        </socketContext.Provider>
    );
}

