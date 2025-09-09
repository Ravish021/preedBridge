import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import { useEffect } from "react";
import  { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import {  RiEmojiStickerLine } from "react-icons/ri";
import { useSocket } from "@/Socket/socketContext";
import { useSelector } from "react-redux";
import uploadFile from "@/helper/uploadFile";
import { IoIosClose } from "react-icons/io";


export const MessageBar = () => {
  const userProfile = useSelector((state) => state?.user?.profile);
  const emojiRef= useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);

  const [selectedFile,setSelectedFile] = useState(null);
  const [message,setMessage]= useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);  
  const handleEmojiPicker = (emoji)=>{
    setMessage((message)=> message + emoji.emoji);
  }
  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }
  const handleFileClick =()=>{
    if(fileInputRef.current)
      fileInputRef.current.click();
  }

  const handleFileOnChange =async (e)=>{
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if(file){
      setSelectedFile(file);
    }
  }
  

  const handleSendMessage = async()=>{
    if(!socket){
      console.log("Socket is not connected");
      return;
    }
    if(!message.trim() && !selectedFile){
      console.log("Message is empty");
      return;
    } 



    let fileUrl;
    if(selectedFile){
      const dataFileResponse = await uploadFile(selectedFile);
      console.log("File upload response:", dataFileResponse);
      fileUrl = dataFileResponse.secure_url;
      console.log("File uploaded successfully:", fileUrl);
    }
    if(selectedChatType === "contact"){
      if(fileUrl){
        socket.emit("sendMessage", {
          sender: userProfile._id,
          receiver: selectedChatData._id,
          content: undefined,
          messageType: "file",
          fileUrl: fileUrl,
        });
      }
       setSelectedFile(null);
    }
    else if(selectedChatType === "channel"){
      if(fileUrl){
        socket.emit("sendChannelMassage", {
          sender: userProfile._id,  
          channelId: selectedChatData._id,
          content: undefined,
          messageType: "file",
          fileUrl: fileUrl,
        });
      }
      setSelectedFile(null);  
    }


    if(message.trim() ){

    
    if(selectedChatType === "contact"){
      socket.emit("sendMessage",{
        sender: userProfile._id,
        receiver: selectedChatData._id,
        content:message,
        messageType: "text",
        fileUrl:undefined,
      })
    }else if(selectedChatType === "channel"){
      socket.emit("sendChannelMassage",{
        sender: userProfile._id,
        channelId: selectedChatData._id,
        content:message,
        messageType: "text",
        fileUrl:undefined,
      })
    }
    setMessage("");
  }
  }
  useEffect(()=>{
    const handleClickOutside = (event)=>{
      if(emojiRef.current && !emojiRef.current.contains(event.target)){
        setEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    };

  },[emojiRef]);


  return (
    <div className="h-[6vh]  flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex h-10 rounded-md items-center bg-gray-800 gap-4 pr-5">

      {
        selectedFile &&(
          <div className=" relative flex items-center h-8 ml-2  bg-gray-400 p-0.5 text-sm rounded-md">
              <span className="truncate max-w-[200px] block">{selectedFile.name}</span>
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-0 right-0 ml-2 text-red-500 hover:text-red-700 text-lg"
            >
              <IoIosClose />

            </button>
          </div>
        )
      }
        <input
          type="text"
          placeholder="Type your message here..."
          className="w-full px-4 py-2 bg-transparent text-gray-300  outline-none focus:border-none focus:outline-none "
          value={message}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
             
            }
          }}
        />
        <button className="  text-neutral-500 focus:border-none  focus:outline-none hover:text-white cursor-pointer transition-all duration-200 "
        onClick={handleFileClick}
        >
          <GrAttachment className="text-lg"/> 
          <input type="file" 
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileOnChange}
          />
        </button>
        <div className="relative">
          <button className="  text-neutral-500 focus:border-none  focus:outline-none hover:text-white cursor-pointer transition-all duration-200 "
            onClick={()=> setEmojiPickerOpen(!emojiPickerOpen)}
          >
          <RiEmojiStickerLine className="text-lg"/> 
        </button>
        
        <div className="absolute bottom-16 right-0" ref={emojiRef}> 
          <EmojiPicker
            theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={handleEmojiPicker}
            autoFocusSearch={false}
            width={350}
          />
        </div>
        </div>
      </div>
      <button className="bg-[#00838F] rounded-md flex items-center justify-center p-2
       hover:bg-[#00838fc8]   focus:border-none  focus:outline-none  cursor-pointer transition-all 
       duration-200 "  onClick={handleSendMessage} >
        <IoSend className=" text-white text-2xl"/>
      </button>
    </div>
  )
}

