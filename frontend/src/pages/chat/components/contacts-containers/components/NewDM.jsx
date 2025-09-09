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
import { setSelectedChatData, setSelectedChatType } from "@/Store/chatSlice";

export const NewDM = () => {
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [contactList, setContactList] = useState([]);
    const dispatch = useDispatch();


    const handleOnChange = async (e)=>{
        const searchTerm = e.target.value;
        try {
            if(searchTerm.length > 0){
                const searchResponse = await fetch(SummaryUrl.searchContact.url,{ 
                    method: SummaryUrl.searchContact.method,
                    headers:{
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({searchTerm})
                })
                const searchResponseData = await searchResponse.json();
                if(searchResponseData.success){
                    setContactList(searchResponseData.contact);
                }
            }else{
                setContactList([]);
                }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            setContactList([]); 
        }
    }

    const selectNewContact = (contact)=>{
        setOpenNewContactModal(false);
        dispatch(setSelectedChatType("contact")); 
        dispatch(setSelectedChatData(contact));
        setContactList([]);
        
    }
  return ( 
    <> 
        <Tooltip>
            <TooltipTrigger>
                <FaPlus className="text-gray-300 font-light text-md hover:text-white 
                cursor-pointer transition-all duration-300"
                onClick={()=> setOpenNewContactModal(!openNewContactModal)}/>
            </TooltipTrigger>
            <TooltipContent className={"bg-gray-900 text-white p-3"}>
                <p>Select New Contact</p>
            </TooltipContent>
        </Tooltip>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
            <DialogContent className={"w-[400px] h-[400px] bg-gray-800 text-white border-none flex flex-col"}>
            <DialogHeader>
            <DialogTitle>Select Contact</DialogTitle>
            
            </DialogHeader>
            <div>
                <input type="text" className=" w-full rounded-lg p-2 bg-gray-800  focus:outline-none
                 border-2 border-gray-500" placeholder="Search " 
                 onChange={handleOnChange} />
            </div>
            {
                contactList.length === 0 ? (
                    <div className="">
                        <p className="text-gray-400 text-center mt-4">
                            No contacts found 
                        </p>
                    </div>
                ): (
                    <div className="flex flex-col gap-2 mt-4"
                    >
                        {contactList.map((contact) => (
                            <div key={contact._id} className=" flex flex-row items-center gap-2 p-2 bg-gray-700 rounded-lg
                             hover:bg-gray-600 cursor-pointer overflow-y-auto"
                                onClick={()=> selectNewContact(contact)}
                             >
                                <div className="w-12 h-12 relative flex items-center justify-center">
                                    <Avatar className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all 
                                        duration-300 ease-in-out transform hover:scale-105">
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
                                    {
                                        contact.name ? contact.name:contact.userName
                                    }
                                </span>
                                <span className="text-xs text-gray-400 font-serif ">{contact.CollegeName}</span>
                                <span className="text-gray-400 text-sm">
                                    {
                                        contact.email
                                    }
                                </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </DialogContent>
        </Dialog>
    </>
  )
}
