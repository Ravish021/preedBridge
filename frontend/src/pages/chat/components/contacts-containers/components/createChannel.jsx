import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import Input from "@/components/Input";
import SummaryUrl from "@/Common/url";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch } from "react-redux";
import { setSelectedChatData, setSelectedChatType,addChannel } from "@/Store/chatSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";
import { toast } from "react-toastify";

export const CreateChannel = () => {
    const [newChannelModal, setOpenNewChannelModal] = useState(false);
    const [AllContact,setAllContact] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        const getAllContacts = async()=>{
            const response = await fetch(SummaryUrl.getAllContactsChannels.url,{
                method:SummaryUrl.getAllContactsChannels.method,
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: "include", 
            });
            const data = await response.json();
            if(data.success){
                setAllContact(data.contacts)
            }
            console.log("All Contacts:", AllContact);
        };

        getAllContacts();
    },[])

    

    const createChannel = async()=>{
        try {
            if(channelName.trim() > 0 || selectedContacts.length > 0){
            const CCresponse = await fetch(SummaryUrl.createChannel.url,{
            method:SummaryUrl.createChannel.method,
            headers:{
                "Content-Type": "application/json",
            },
            credentials:"include",
            body: JSON.stringify({
                channelName, 
                members: selectedContacts.map(contact => contact.value), // Assuming selectedContacts is an array of contact objects
            }),
        })
            console.log("Create Channel Response:", CCresponse);
            const CCdata = await CCresponse.json();
            if(CCdata.success){
                toast.success("Channel created successfully", {
                    theme: "dark",
                });
                dispatch(addChannel(CCdata.channel));
                setOpenNewChannelModal(false);
                setChannelName("");
                setSelectedContacts([]);
            } else {
                toast.error("Failed to create channel", {
                    theme: "dark",
                });
            }
    }
        } catch (error) {
            console.error("Error creating channel:", error);
            toast.error("Failed to create channel", {
                theme: "dark",
            });
        }
        
    }

  return ( 
    <> 
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-gray-300 font-light text-md hover:text-white 
                cursor-pointer transition-all duration-300"
                onClick={()=> setOpenNewChannelModal(!newChannelModal)}/>
            </TooltipTrigger>
            <TooltipContent className={"bg-gray-900 text-white p-3"}>
                <p>Create Channel</p>
            </TooltipContent>
        </Tooltip>
        <Dialog open={newChannelModal} onOpenChange={setOpenNewChannelModal}>
            <DialogContent className={"w-[400px] h-[400px] bg-gray-800 text-white border-none flex flex-col"}>
            <DialogHeader>
            <DialogTitle>Select Contact for Channel</DialogTitle>
            
            </DialogHeader>
            <div>
                <input type="text" className=" w-full rounded-lg p-2 bg-gray-800  focus:outline-none
                 border-2 border-gray-500" placeholder="Channel Name" 
                 onChange={(e)=>setChannelName(e.target.value)}
                 value={channelName} />
            </div>
            
            <MultipleSelector 
            className="rounded-lg bg-gray-700  border-none "
            placeholder="Select members"
            defaultOptions={AllContact}
            value={selectedContacts}
            onChange={setSelectedContacts}
            emptyIndicator={
                <p className=" h-full text-center text-lg leading-10 ">No result found</p>
            }
            tagClassName="bg-yellow-500 text-black rounded-md px-2 py-1" 
            />

            <div>
                <Button className="w-full bg-[#00838F] hover:bg-[#00838fd2] transition-all duration-300" 
                onClick={createChannel}
                >
                    Create
                </Button>
            </div>
            
        </DialogContent>
        </Dialog>
    </>
  )
}
