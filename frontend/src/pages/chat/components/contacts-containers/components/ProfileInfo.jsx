import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {Avatar} from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { bgColors,getColor }from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useActionData, useNavigate } from "react-router-dom";


export const ProfileInfo = () => {
    const user = useSelector((state) => state?.user?.user); 
    const userProfile = useSelector((state) => state?.user?.profile); 
    const navigate = useNavigate();
    // console.log("user", user);



    const handleNaigateToProfilePage = ()=>{
        navigate("/profile");
    }
  return (
    <div className="absolute w-full bottom-0 h-14 flex items-center justify-center px-8 bg-gray-700">
        <div className="w-12 h-12 relative flex items-center justify-center">
            <Avatar className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all 
            duration-300 ease-in-out transform hover:scale-105">
            {userProfile.image ? (
              <AvatarImage
                key={userProfile.image}
                src={userProfile.image}
                alt="image"
                className="w-full h-full rounded-full object-cover "
              />
            ) : (
              <AvatarFallback 
                className={`uppercase w-full h-full  flex items-center justify-center text-4xl font-semibold text-white
                rounded-full`}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
           
        </div>
        <div className="flex flex-col items-start justify-center ml-4">
          <p className="text-gray-300 text-lg font-semibold ">
            {userProfile.name ? user.name: user.userName}
          </p>
          <span className="text-gray-400 font-serif  ">{userProfile.CollegeName}</span>
        </div>
        <div className="flex items-center justify-center ml-auto">
            <Tooltip>
              <TooltipTrigger>
                <FiEdit2 className="text-gray-400  text-md font-medium hover:scale-110 transition-all"
                onClick={handleNaigateToProfilePage}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 ">
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
        </div>
    </div>
  )
}

