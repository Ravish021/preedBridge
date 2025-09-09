import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// import animationData from "@assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const bgColors = [
    "bg-rose-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
    "bg-lime-500",
    "bg-gray-800",
    
   
  ];
export const getColor = (bgColors,color) => {
  if(color >= 0 && color < bgColors.length){
    return bgColors[color];
  }
  return bgColors[0]; 
};

// export const animationDefaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// }