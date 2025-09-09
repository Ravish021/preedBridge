import { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { Loader } from "lucide-react";
import { useEffect,useRef,useContext } from "react";
import {  useNavigate } from "react-router-dom";
import {Avatar} from "../components/ui/Avatar"; 
import { bgColors,getColor } from "../lib/utils";
import {Button} from "../components/ui/Button"; 
import SummaryUrl from "@/Common/url";
import imageToBase64 from "@/helper/imageToBase";
import { toast } from "react-toastify";
import uploadImageCloud from "../helper/uploadImage"; 
import Context from '../Contex/Contex';

const Profile = () => {
    const user = useSelector((state) => state?.user?.user); 
    const userProfile = useSelector((state) => state?.user?.profile);
    // console.log("User Profile: ",userProfile);
    const {currUserProfile} = useContext(Context);

    const [selectColor,setSelectColor] = useState(0);
    const[hovered,setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData ,setUserData]= useState({
      email: user?.email || "",
      name: user?.name ||"",
      image: userProfile?.image||"",
      CollegeName: userProfile?.CollegeName || "",
      tier: userProfile?.tier || "",
      year:  userProfile?.year || "",
      userId: user?._id || "",
      hovered: false,
      color: userProfile?.color || "#000000", 
      
    });
    // console.log("User Data: ",userData);

    const navigate = useNavigate();
    const fileInputRef = useRef(null); 

    const handleOnChange = (e)=>{
      const{name ,value} = e.target;
      setUserData((prev)=>{
        return{
          ...prev,
          [name]: value,
        }
      })
    }
    const handleOnSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const dataResponse = await fetch(SummaryUrl.Userprofile.url,{
          method:SummaryUrl.Userprofile.method,
          headers:{
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData)

        })
        const dataApiResponse = await dataResponse.json();
        // console.log("Profile Update Response: ",dataApiResponse);
        if(dataApiResponse.success){
          setIsLoading(false);
          await currUserProfile();    // Update the user profile in the Redux store
          navigate("/");
          toast.success(dataApiResponse.message,{
            theme: "dark",
          })
        }else{
          setIsLoading(false);
          toast.error(dataApiResponse.message,{
            theme:"dark",
          })
        }
      } catch (error) {
        console.error("Error updating profile: ",error);
        setIsLoading(false);
        toast.error(error.message,{
          theme: "dark",
        })
      }
    }

    const handleNavigate= ()=>{
        navigate(-1);
    }

    const handleFileInputClick = ()=>{
      fileInputRef.current.click();       // Trigger the file input click
    }

    const handleImageChange = async(event)=>{
      const file = event.target.files[0];
      const uploadImageCloudinary = await uploadImageCloud(file);
      // console.log("Upload Image Cloudinary: ",uploadImageCloudinary.url);
      setUserData((prev)=>{
        return {
          ...prev,
          image: uploadImageCloudinary.url,
        }});

        if(uploadImageCloudinary){
          toast.success("Image uploaded successfully!", {
            theme: "dark",
          });
        }
        if(!uploadImageCloudinary){
          toast.error("Image upload failed!", {
            theme: "dark",
          });
        }
    }

    const handleImageDelete = async()=>{
      setUserData((prev)=>{
        return {
          ...prev,
          image: "",
        } 
      })
    }

    useEffect(()=>{
      setUserData((prev)=>({
        ...prev,
        color: bgColors[selectColor] || "#000000",
        // image: prev.image || user?.image || "",
      }))
    },[selectColor])

    return (
  <form className="bg-gray-900 min-h-screen flex items-center justify-center px-4 py-5"
  onSubmit={handleOnSubmit}>
    <div className="bg-gray-900  p-6 md:p-8 rounded-xl shadow-lg flex flex-col md:flex-row  gap-8 w-full max-w-2xl z-10">
    
      <div onClick={handleNavigate}>
        <IoIosArrowBack className="text-4xl text-gray-400 hover:text-gray-600 cursor-pointer" />
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col md:flex-row justify-center gap-x-15 md:items-start sm:items-center ">
        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden group mx-auto sm:mx-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Avatar className="w-full h-full  rounded-full border-2 border-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-105">
            {userData.image ? (
              <AvatarImage
                key={userProfile.image}
                src={userData.image}
                alt="image"
                className="w-full h-full rounded-full object-cover "
              />
            ) : (
              <AvatarFallback 
                className={`uppercase w-full h-full  flex items-center justify-center text-4xl font-semibold text-white
                ${getColor(bgColors,selectColor)} rounded-full`}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>

          {hovered && (
            <div className="absolute inset-0 flex items-center justify-center  bg-gray-800/75 p-1 rounded-full text-4xl text-black cursor-pointer  animate-fadeIn "
              onClick={userData.image?handleImageDelete:handleFileInputClick}
            >
              {userData.image ? <FaRegTrashAlt /> : <FaPlus />}
            </div>
          )}
          <input type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleImageChange} 
            name="profile-image" 
            accept="image/*"
          />
        </div>
        {/* profile input */}
          <div className="flex min-w-32 md:min-w-64 flex-col gap-4 text-white items-center justify-center ">
              <div className="w-full ">
                <div className="flex flex-col gap-2">
                  <label htmlFor="year">Email:</label>
                <input
                  type="email"
                  value={userData.email}
                  disabled
                  className="w-full p-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="year">Name:</label>
                <input
                  type="text"
                  value={userData.name}
                  disabled
                  className="w-full p-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="year">College Name:</label>
                <input
                  type="text"
                  value={userData.CollegeName}
                  required
                  name="CollegeName"

                  onChange={handleOnChange}
                  className="w-full p-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="year">Tier:</label>
                  <input
                    type="number"
                    value={userData.tier}
                    required
                    name="tier"
                    min="1"
                    onChange={handleOnChange}
                    className="w-full p-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="year">Year:</label>
                  <input
                    id="year"
                    type="number"
                    value={userData.year}
                    required
                    name="year"
                    min="1"
                    onChange={handleOnChange}
                    className="w-full p-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                
              </div>
          {/* user can change the profile color */}
          <div className=" flex flex-wrap gap-2 pt-2">
            {bgColors.map((color,index)=>{
              return(
                <div className={`${color} h-7 w-7  rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center`} key={index}
                onClick={()=> setSelectColor(index)}>
                {selectColor === index && (
                  <div className="border-2  rounded-full w-full h-full"></div>
                )}
                </div>
              )
            })}

          </div>
          <div className="w-full flex  items-center justify-end pt-2">  
            <Button className={ "h-full w-full bg-teal-600 hover:bg-teal-700 text- text-lg "}
            type="submit"
            disabled={isLoading}>
              {
                isLoading ?(
                  <Loader className="animate-spin mx-auto" size={20} />
                ):(
                  "Save"
                )
              }
            </Button>
          </div>
          </div>
      </div>
      
    </div>
  </form>
);

}
export default Profile;