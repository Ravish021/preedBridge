import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipsesSharp,IoClose } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import { FaTrophy } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUserDetails } from '../Store/userSlicer';
import SummaryAPI from '../Common/url';
import { useState } from 'react';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogOut = async () => {
    const response = await fetch(SummaryAPI.userLogOut.url, {
      method: SummaryAPI.userLogOut.method,
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message,{
          theme: "dark",
      });
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message,{
          theme: "dark",
      });
    }
  };


  return (
    <div className="h-16 bg-gray-800  shadow-md px-6 flex items-center justify-between relative">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
        <span className="text-xl font-bold text-[#00838F]">PeerBridge</span>
      </div>

      <div className='md:hidden text-white text-3xl cursor-pointer'onClick={()=>setMenuOpen(!menuOpen)} >
        {menuOpen ? <IoClose />: <RxHamburgerMenu /> }
      </div>

      {/* Navigation & Login */}
      <div className={`absolute top-16 right-0 md:w-2xl md:static md:flex justify-end flex-row md:flex-row items-center gap-6 bg-gray-900 md:bg-transparent px-6 md:px-0 py-4 md:py-0 z-50 transition-all duration-300 ease-in-out rounded-b-md
        ${menuOpen ? 'flex' : 'hidden'}`} >

        <Link to="/home" className="text-gray-400 text-2xl hover:text-white">
          <IoMdHome />
        </Link>
        <Link to="/chat" className="text-gray-400 text-2xl hover:text-white">
          <IoChatboxEllipsesSharp />
        </Link>
        <Link to="/leaderboard"  className="text-gray-400 text-2xl hover:text-white" >
        <FaTrophy />
        </Link>
        <Link to="/profile" className="text-gray-400 text-3xl hover:text-white" >
        <MdAccountCircle />
        </Link>
        <div>
          {user?(
            <button
                onClick={handleLogOut}
                className="rounded-md bg-[#00838F] px-3 py-1 hover:bg-[#006d72] text-white"
              >
                Log Out
              </button>
          ):(
            <Link to="/login" className="text-white font-medium  px-3 py-1 rounded-md bg-[#00838F]">
              Login
            </Link>
          )}

        </div>
      </div>
    </div>
  );
};

export default Header;
