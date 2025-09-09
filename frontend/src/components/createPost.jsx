import { FaVideo } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import SummaryUrl from "@/Common/url";
import { toast } from "react-toastify";


export const CreatePostBox = () => {
        const userProfile = useSelector((state) => state?.user?.profile); 
        const [isOpen, setIsOpen] = useState(false);  
        const [postContent, setPostContent] = useState({
          userName: userProfile?.name || "",
          userId: userProfile?._id || "",
          content: ""
        });

       const handlePost = async ()=>{
        try{
          //  console.log("Post submitted:", postContent);
            const responseData = await fetch(SummaryUrl.createPost.url,{
            method: SummaryUrl.createPost.method,
            headers:{
              "Content-Type":"application/json",
            },
            credentials:"include", 
            body:JSON.stringify(postContent)
            })

            const data = await responseData.json();
            console.log("Response from server:", data);

            if(data.success){
              toast.success("Successful Post",{
                theme:"dark"
              })
            }else{
              toast.error("Some error in Post",{
                theme:"dark"
              })
            }
           setPostContent("");
           setIsOpen(false);
        }catch(err){
          toast(err.message,{
            theme:"dark",
          })
        }
       }

       const handleOnChange = (e)=>{
        setPostContent((prev)=>({
          ...prev,
          content: e.target.value
        }));
       }

 
  return (
    <div className="bg-gray-800 rounded-xl p-4 w-full max-w-xl mx-auto">
      {/* Top: Input */}
      <div className="flex items-center gap-3">
        <img
          src={userProfile?.image}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Start a post"
          className="flex-1 cursor-pointer caret-transparent bg-gray-600 text-sm
           text-white px-4 py-2 rounded-full outline-none placeholder-gray-400"
          onClick={() => setIsOpen(true)}
          />
      </div>
      <div className="flex justify-between mt-4 px-2 text-sm text-gray-300">
        <button className="flex items-center gap-2 hover:text-white">
          <FaVideo className="text-green-500" />
          <span>Video</span>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <MdPhoto className="text-blue-400" />
          <span>Photo</span>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <FaRegNewspaper className="text-orange-400" />
          <span>Write article</span>
        </button>
      </div>

      {/* New Input component */}
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 w-full max-w-2xl rounded-xl p-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <IoClose size={28} />
            </button>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={userProfile?.image}
                alt="User"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h4 className="text-white font-semibold">{userProfile?.name}</h4>
                <span className="text-gray-400 text-sm">Post to Anyone</span>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={postContent.content}
              onChange={handleOnChange}
              placeholder="What do you want to talk about?"
              className="w-full bg-transparent border-1 border-gray-500 rounded-2xl text-white text-lg p-2 outline-none resize-none"
              rows={6}
            ></textarea>

            {/* Action Buttons */}
            <div className="flex justify-end items-center mt-4 ">
              <button className="bg-teal-600 text-white px-6 py-1 text-lg rounded-full cursor-pointer"
              onClick={handlePost}
              disabled={!postContent.content.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
