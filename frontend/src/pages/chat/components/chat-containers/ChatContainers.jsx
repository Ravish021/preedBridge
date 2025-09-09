import { ChatHeader } from "./components/ChatHeader";
import {MessageBar} from "./components/messageBar";
import { MessageContainer } from "./components/MessageContainer";

 const ChatContainers = () => {
  return (
    <div className="fixed top-0 h-[100vh]  w-[100vw] bg-gray-900 flex flex-col md:static md:flex-1">
        <ChatHeader/>
        <MessageContainer/>
        <MessageBar/>
    </div>
  )
}
export default ChatContainers;
