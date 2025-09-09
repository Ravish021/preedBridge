import React from 'react'
import { motion } from 'framer-motion'

const Animation = ({ color, size, top, left,bottom,right, delay }) => {
  return (
    <motion.div 
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`} 
      style={{
        ...(top !== undefined && { top }),
        ...(left !== undefined && { left }),
        ...(bottom !== undefined && { bottom }),
        ...(right !== undefined && { right }),
      }}
      animate={{
        x: ["10%", "100%", "0%"],
        y: ["0%", "100%", "10%"],
        rotate: [0, 360, 0],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay: delay,
      }}
      aria-hidden="true"
    />
  )
}

export default Animation
