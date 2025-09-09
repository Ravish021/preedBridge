import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { closeSelectedChat } from '@/Store/chatSlice'; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from 'react-redux';

export const  ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);

  // console.log("Selected Chat Data:", selectedChatData);
  
  return (
    <div className="h-[10vh] border-b-2 border-gray-600 flex items-center justify-between px-20">
      <div className="flex items-center  gap-4 w-full justify-between" >
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <Avatar className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all 
            duration-300 ease-in-out transform hover:scale-105">
            {selectedChatData.image ? (
              <AvatarImage
                key={selectedChatData.image}
                src={selectedChatData.image}
                alt="image"
                className="w-full h-full rounded-full object-cover "
              />
            ) : (
              <AvatarFallback 
                className={`uppercase w-full h-full  flex items-center justify-center text-4xl font-semibold text-white
                rounded-full`}
              >
                {selectedChatData?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div>
        
          <p className="text-gray-300 text-lg font-semibold">
            {selectedChatType === "contact"
                      ? selectedChatData.name
                      : selectedChatData.channelName}
          </p>
          <p className="text-gray-500 text-sm">
            {selectedChatType === "contact"
                      ? selectedChatData.CollegeName
                      :`${selectedChatData.members.length} members`}
          </p>
        </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <button className=" text-neutral-500 focus:border-none  focus:outline-none hover:text-white
           cursor-pointer transition-all duration-200 ">
            <RiCloseFill className="text-3xl"
            onClick={()=> dispatch(closeSelectedChat())}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
