
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { message } from "antd";
import moment from "moment/moment";
import SummaryUrl from "@/Common/url";
import { setSelectedChatMessages } from "@/Store/chatSlice";
import { MdFolderZip } from "react-icons/md";
import {IoMdArrowRoundDown} from "react-icons/io"
import { useState } from "react";
export const MessageContainer = () => {
  const scrollRef = useRef(null);
  const userProfile = useSelector((state) => state?.user?.profile);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatMessages = useSelector((state) => state.chat.selectedChatMessages);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!selectedChatData || !selectedChatType || !selectedChatMessages){
      message.error("Please select a chat to view messages.");
    }
    const getMessages = async () => {
      try {
        const messagesResponse = await fetch(`${SummaryUrl.getMessages.url}?id=${selectedChatData._id}`,{
          method: SummaryUrl.getMessages.method,
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile?.token}` // Assuming you have a token in your user profile
          },
          credentials: "include", 
        });
        const messagesData = await messagesResponse.json();
        console.log("Messages Data:", messagesData);
        if(messagesData.success){
          dispatch(setSelectedChatMessages(messagesData.messages));
          // console.log("Messages fetched successfully:", messagesData.messages);
        }
      }
       catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    const getChannelMessages = async()=>{
      try{
        setLoading(true);
        const channelMessagesResponse = await fetch (`${SummaryUrl.getChannelMessages.url}/${selectedChatData?._id}`,{
          method: SummaryUrl.getChannelMessages.method,
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile?.token}` // Assuming you have a token in your user profile
          },
          credentials: "include",
        });
        const channelMessagesData = await channelMessagesResponse.json();
        console.log("Channel Messages Data:", channelMessagesData);
        if(channelMessagesData.success){
          dispatch(setSelectedChatMessages(channelMessagesData.messages));
         
        }
      }catch(error){
        
        console.error("Error fetching channel messages:", error);
      }finally{
        setLoading(false);
      }
    }

    if(selectedChatData._id ){
      if(selectedChatType === "contact"){
        getMessages();
      }
      else if(selectedChatType === "channel"){
        getChannelMessages();
      }
    }
  },[selectedChatData,selectedChatType, dispatch, userProfile?.token]);

  useEffect(()=>{
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the bottom of the message container
    }
  }, [selectedChatMessages]);

  const checkIfImage = (url)=>{
    return /\.(jpeg|jpg|gif|png|webp)$/.test(url);

  }
 const fileDownload = (fileUrl) => {
  const link = document.createElement("a");
  link.href = fileUrl; 
  link.download = "";  
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  const renderedMessages = ()=>{
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate; 
      lastDate = messageDate; 
      return (
        <div key={message._id} >
          {
            showDate && (
              <div className="text-gray-500 text-xs text-center my-2">
                {moment(message.createdAt).format("MMMM Do YYYY")}
              </div>
            )}
            {
              selectedChatType === "contact" && renderDMmessages(message)}
                            
              {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      )
    });
  };

  const renderDMmessages = (message)=>( 
    // console.log("Message Data in renderDM Message:", message),
  <div
    className={`${message.sender === selectedChatData._id ?
     "text-left" 
     :"text-right"}`}>
      {
        message.messageType === "text"&&(
          <div 
            className={`${message.sender === selectedChatData._id ? 
              "bg-white text-black" :    //receiver message
              "bg-gray-900 text-white"}  //sender message
               border
            inline-block py-1 px-2 rounded-lg my-1 max-w-[60%] break-words`}
            > 
            {
              message.content
            }
        </div>
        )}

        {
          message.messageType === "file" &&(
            <div 
            className={`${message.sender === selectedChatData._id ? 
              "bg-white text-black" :    //receiver message
              "bg-gray-900 text-white"}  //sender message
               border
            inline-block py-1 px-2 rounded-lg my-1 max-w-[60%] break-words`}
            > 
            {
             checkIfImage(message.fileUrl) ? (
             <div className="relative inline-block max-w-full">
              <img src={message.fileUrl} alt="uploaded" className="rounded-sm p-1" />
              <span className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 text-white p-1
               rounded-full transition-all duration-300 cursor-pointer "
                   onClick={()=>fileDownload(message.fileUrl)}
                   >
                    <IoMdArrowRoundDown />
                   </span>
              
             </div>):( 
              <div className="flex flex-wrap items-center justify-center gap-1  ">
                   <span className="text-lg rounded-full p-2"> <MdFolderZip/></span>
                   <span className="flex-1 text-sm truncate max-w-[60%] text-gray-700 dark:text-gray-200">
                         {message.fileUrl.split("/").pop()}
                    </span>
                   <span className="bg-gray-600 hover:bg-gray-700  p-1 rounded-full transition-all duration-300 flex-shrink-0  cursor-pointer "
                   onClick={()=>fileDownload(message.fileUrl)}
                   >
                    <IoMdArrowRoundDown />
                   </span>
              </div>)
            }
        </div>
          )
        }
        <div className="text-xs text-gray-500 mt-1">
          {moment(message.createdAt).format("LT")}
        </div>
  </div>
  );
  const renderChannelMessages = (message) => {
    // console.log("Message Data in renderChannel Message:", message);
    return (
      
      <div className={`mt-2  ${message.sender._id !== userProfile._id ? "text-left": "text-right"}`}>
         {
        message.messageType === "text"&&(

          <div
            className={`${message.sender._id === userProfile._id ? 
              "bg-white text-black" :    //receiver message
              "bg-gray-900 text-white"}  //sender message
               border
            inline-block py-1 px-2 rounded-lg my-1 max-w-[60%] break-words `}
            > 
            {
              message.sender._id !== userProfile._id && (
              <span className="font-semibold text-xs text-yellow-500 right-0">{message.sender.name}</span>
              )
            }
            <div>
              {
              message.content
             }
            </div>
            
            
        </div>
        
        )}

        {
          message.messageType === "file" &&(
            <div className="">
            <div 
            className={`${message.sender === selectedChatData._id ? 
              "bg-white text-black" :    //receiver message
              "bg-gray-900 text-white"}  //sender message
               border
            inline-block py-1 px-2 rounded-lg my-1 max-w-[60%] break-words`}
            > 
            
            {
             checkIfImage(message.fileUrl) ? (
             <div className="relative inline-block max-w-full">
              <img src={message.fileUrl} alt="uploaded" className="rounded-sm p-1" />
              <span className="absolute top-2 right-2 bg-gray-600 hover:bg-gray-700 text-white p-1
               rounded-full transition-all duration-300 cursor-pointer "
                   onClick={()=>fileDownload(message.fileUrl)}
                   >
                    <IoMdArrowRoundDown />
                   </span>
              
             </div>
             ):( 
              <div className="flex flex-wrap items-center justify-center gap-1  ">
                   <span className="text-lg rounded-full p-2"> <MdFolderZip/></span>
                   <span className="flex-1 text-sm truncate max-w-[60%] text-gray-700 dark:text-gray-200">
                         {message.fileUrl.split("/").pop()}
                    </span>
                   <span className="bg-gray-600 hover:bg-gray-700  p-1 rounded-full transition-all duration-300 flex-shrink-0  cursor-pointer "
                   onClick={()=>fileDownload(message.fileUrl)}
                   >
                    <IoMdArrowRoundDown />
                   </span>
              </div> )
            }
            </div>
            {/* {
              message.sender._id !== userProfile._id && (
              <span className="font-semibold text-xs text-yellow-500 right-0">{message.sender.name}</span>
              )
            } */}
            </div>
          )
        }

        <div className="text-xs text-gray-500 mt-1">
          {moment(message.createdAt).format("LT")}
        </div>
      </div>
    )
  }
  return (
    <div className="flex-1 overflow-auto scroll-hidden p-4 px-8 md:[64vw] lg:[70vw] 
    xl:w-[80vw] w-full"
    >
      {loading ? (
              <div className="text-center text-gray-500 py-4">Loading messages...</div>
            ) : (
              renderedMessages()
            )}
      <div ref={scrollRef} className="h-4 invisible"></div>
    </div>
  )
}
