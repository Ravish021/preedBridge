import { CreatePostBox } from "@/components/createPost"
export const Home = () => {
  return (
    <div className="text-opacity-50 text-white flex flex-col gap-5 items-centers mt-10
        lg:text-4xl text-3xl transition-all duration-3000 text-center">
           <CreatePostBox />
           

            {/* <h3 className="poppins-medium">
                Hi<span className="text-yellow-400">! </span>
                Welcome to <span className="text-yellow-400 font-serif">PeerBridge</span>
            </h3> */}

        </div>
  )
}
