import {
  setSelectedChatData,
  setSelectedChatType,
  setSelectedChatMessages,
} from "@/Store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ContactList = ({ contacts, isChannel = false }) => {
  console.log("Contacts in ContactList:", contacts);
  const selectedChatData = useSelector((state) => state.chat.selectedChatData);
  const selectedChatType = useSelector((state) => state.chat.selectedChatType);
  const dispatch = useDispatch();

  const handleClick = (contact) => {
    dispatch(setSelectedChatType(isChannel ? "channel" : "contact"));
    dispatch(setSelectedChatData(contact));
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch(setSelectedChatMessages([]));
    }
  };
  console.log("Selected Chat Data:", contacts);
  return (
    <div className="mt-4">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-6 py-1.5 transition-all duration-300 
                  cursor-pointer flex items-center gap-2
                  ${
                    selectedChatData && selectedChatData._id === contact._id
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-4 items-center justify-start  ">
            {!isChannel ? (
              <div
                key={contact._id}
                className=" flex flex-row items-center gap-2
                                     cursor-pointer overflow-y-auto"
                // onClick={() => selectNewContact(contact)}
              >
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Avatar
                    className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all 
                                            duration-300 ease-in-out transform hover:scale-105"
                  >
                    {contact.image ? (
                      <AvatarImage
                        key={contact.image}
                        src={contact.image}
                        alt="image"
                        className="w-full h-full rounded-full object-cover "
                      />
                    ) : (
                      <AvatarFallback
                        className={`uppercase w-full h-full  flex items-center justify-center text-4xl font-semibold text-white
                                    rounded-full`}
                      >
                        {contact?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="flex flex-col leading-none ">
                  <span className="text-white font-mono">
                    {contact.name ? contact.name : contact.userName}
                  </span>
                  <span className="text-xs text-gray-400 font-serif ">
                    {contact.CollegeName}
                  </span>
                </div>
              </div>
            ): (
              <div
                key={contact._id}
                className=" flex flex-row items-center gap-2
                                     cursor-pointer overflow-y-hidden"
              >
                <div className="w-12 h-12 relative flex items-center justify-center">
                  <Avatar
                    className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all 
                                            duration-300 ease-in-out transform hover:scale-105"
                  >
                    {contact.image ? (
                      <AvatarImage
                        key={contact.image}
                        src={contact.image}
                        alt="image"
                        className="w-full h-full rounded-full object-cover "
                      />
                    ) : (
                      <AvatarFallback
                        className={`uppercase w-full h-full  flex items-center justify-center text-4xl font-semibold text-white
                                    rounded-full`}
                      >
                        {contact?.name?.charAt(0)?.toUpperCase() || "C"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                <div className="flex flex-col leading-none ">
                  <span className="text-white font-mono">
                    {contact.channelName}
                  </span>
                  <span className="text-xs text-gray-400 font-serif ">
                    {contact.members.length} members
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
