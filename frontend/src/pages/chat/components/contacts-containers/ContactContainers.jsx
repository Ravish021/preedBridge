import { useEffect } from "react";
import { NewDM } from "./components/NewDM";
import {ProfileInfo} from "./components/ProfileInfo";
import SummaryUrl from "@/Common/url";
import { useDispatch ,useSelector} from "react-redux";
import { ContactList } from "@/components/contactList";
import { setDirectMessageContacts,setChannelContacts } from "@/Store/chatSlice";
import { CreateChannel } from "./components/createChannel";
 const ContactContainers = () => {
  const directMessageContacts = useSelector((state) => state.chat.directMessageContacts);
  const channelContacts = useSelector((state) => state.chat.channelContacts);
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const getAllContacts = async()=>{
      const response = await fetch(SummaryUrl.getAllContactsForDM.url,{
        method: SummaryUrl.getAllContactsForDM.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      const data  =  await response.json();
      if(data.success){
        console.log("Contacts fetched successfully:", data.contacts);
        dispatch(setDirectMessageContacts(data.contacts));
      }
    }

    const getAllChannels =async()=>{
      const response =await fetch(SummaryUrl.getUserChannels.url,{
        method: SummaryUrl.getUserChannels.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Channels Data:", data);  
      if(data.success){
        console.log("Channels fetched successfully:", data.channel);
        dispatch(setChannelContacts(data.channel));
      }
    }
    getAllContacts();
    getAllChannels();
  },[dispatch]);





  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[35vw] w-full h-full bg-gray-900 border-r border-black overflow-y-auto">
        
        <div>
          <div className="flex items-center justify-between ">
            <Title  text="Recent Message"/>
            <NewDM />
          </div>
          <div className="max-h-[70vh] overflow-y-auto scrollbar-hidden">
              <ContactList contacts={directMessageContacts}/>
          </div>
          <div className="flex items-center justify-between ">
            <Title  text="Channels"/>
            <CreateChannel/>
          </div>
           <div className="max-h-[70vh] overflow-y-auto scrollbar-hidden">
              <ContactList contacts={channelContacts} isChannel={true}/>
          </div>
        </div>

        <ProfileInfo/>
    </div>
  )
}

export default ContactContainers;

const Title = ({text})=>{
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-6 pt-2 font-bold text-opacity-90 text-sm">
      {text}
    </h6>
  )

}