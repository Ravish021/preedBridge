import Lottie from "react-lottie";
// import { animationDefaultOptions } from "../../../../lib/utils";   
 const emptyChatCont = () => {
  return (
    <div className="flex-1 bg-gray-800 md:flex flex-col justify-center items-center hidden duration-1000 transition-all ">
        {/* <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}     
        /> */}

        <div className="text-opacity-50 text-white flex flex-col gap-5 items-centers mt-10
        lg:text-4xl text-3xl transition-all duration-3000 text-center">
            <h3 className="poppins-medium">
                Hi<span className="text-yellow-400">! </span>
                Welcome to <span className="text-yellow-400 font-serif">PeerBridge</span>
            </h3>

        </div>

    </div>
  )
}
export default emptyChatCont;
