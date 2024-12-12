/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import { IoIosArrowDown } from "react-icons/io"
import { motion } from "framer-motion"

const CatalogSelect = ({ data, active, setActive, ShouldBeKey }) => {
  const [isOpened, setIsOpened] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(139, 0, 0, 0.2)"
    }
  }

  return (
    <div className="w-full relative">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#1a0000] 
        border border-[#8B0000]/40 
        relative 
        text-[15px] 
        text-slate-200 
        cursor-pointer 
        w-full 
        px-[24px] 
        font-['poppins'] 
        rounded-md 
        py-1 
        flex 
        items-center 
        justify-center 
        gap-2
        hover:border-[#8B0000] 
        hover:shadow-[0_0_10px_rgba(139,0,0,0.3)]
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#8B0000]"
        onClick={() => setIsOpened(prev => !prev)}
      >
        {ShouldBeKey ? data?.find(item => item?.key === active)?.value : active?.value} 
        <motion.span 
          animate={{ rotate: isOpened ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-md text-[#8B0000]"
        >
          <IoIosArrowDown />
        </motion.span>
      </motion.div>

      {isOpened && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute z-20 w-full mt-2 
          bg-[#1a0000] 
          border border-[#8B0000]/30 
          rounded-xl 
          overflow-hidden 
          shadow-2xl 
          shadow-[#8B0000]/30"
        >
          {data?.map((item, index) => (
            <motion.div
              key={item?.value}
              variants={itemVariants}
              whileHover="hover"
              className={clsx(
                "px-4 py-3 cursor-pointer transition-all duration-300 text-[15px] font-['poppins']",
                {
                  "bg-[#8B0000]/20 text-[#FF4500]": active?.value === item?.value,
                  "hover:bg-[#8B0000]/10 text-white": true
                }
              )}
              onClick={() => {
                setActive(ShouldBeKey ? item?.key : item)
                setIsOpened(false)
              }}
            >
              <div className="flex justify-between items-center">
                {item?.value}
                {active?.value === item?.value && (
                  <span className="text-[#8B0000] font-bold">✓</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default CatalogSelect