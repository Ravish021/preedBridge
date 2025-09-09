import { RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./components/header"; 
import Animation from "./components/Animation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./Contex/Contex";
import { useDispatch } from "react-redux";
import SummaryUrl from "./Common/url";

import { use ,useEffect,useState} from "react";
import { setUserDetails,setUserProfile } from "./Store/userSlicer";
import { Suspense } from "react";

function App() {
  const dispatch = useDispatch(); // Dispatch function to update the Redux store
  const [isLoading, setIsLoading] = useState(true);

  const currUserDetails = async()=>{
    try{
    const dataResponse = await fetch(SummaryUrl.currUserDetails.url,{
      method:SummaryUrl.currUserDetails.method,
      headers:{
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data));
    }
  } catch(err){
    console.error("Error fetching current user details:", err);
    toast.error("Failed to fetch user details", {
      theme: "dark",
    });
  }finally{
    setIsLoading(false);
  }
  };

  const currUserProfile = async()=>{
    try{
      const dataResponse = await fetch(SummaryUrl.currUserProfile.url,{
        method:SummaryUrl.currUserProfile.method,
        headers:{
          "Content-type":"application/json",
        },
        credentials:"include",
      })
      const dataAPI = await dataResponse.json();
      if(dataAPI.success){
        dispatch(setUserProfile(dataAPI.data));
      }
    }catch(err){
      console.log("Error fetching current user profile: ",err);
      toast.error("Failed to set user profile", {
        theme:"dark",
      })
    }
  };

  useEffect(() => {
    currUserDetails();
    currUserProfile();
  },[]);

  if (isLoading) {
     return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 gap-x-2">
        <div className=" text-white text-2xl font-semibold mb-4">
        Loading
        </div>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
  );
  }
  return (
    <Context.Provider value={{
      currUserDetails,
      currUserProfile,
      
    }}>
    <div className="min-h-screen bg-gradient-to-r bg-gray-900 relative overflow-hidden">
      
      <ToastContainer
        position="bottom-right"/>
      <Header className="fixed top-0 left-0 right-0 z-10 w-full" />
      <main className="w-full relative z-0"> 
        <Animation color="bg-pink-500" size="w-64 h-64" top="15%" left="15%" delay={1}  />
        <Animation color="bg-purple-500" size="w-48 h-48" top="75%" left="80%" delay={3}  />
        <Animation color="bg-yellow-500" size="w-32 h-32"top="30%" bottom="30%" left="-10%" delay={5} />
        <Animation color="bg-lime-500" size="w-40 h-40" top="50%" left="5%" delay={4} />
        <Animation color="bg-green-600" size="w-40 h-40" top="25%" bottom="50%" right="10%" delay={1} />
      </main>
      {/* <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
              Loading Page...
            </div>
          }
        >
          <Outlet />
        </Suspense> */}
      <Outlet />
    </div>
     </Context.Provider>
  );
}

export default App;
