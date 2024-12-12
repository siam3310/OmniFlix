"use client"
import { FaCheck } from "react-icons/fa";
import { motion } from 'framer-motion'

const Checkbox = ({ title, checkBoxItem, setCheckBoxItem, multipleSelect }) => {
  const handleCheckBoxChange = () => {
    if (multipleSelect) {
      if (checkBoxItem.includes(title)) {
        setCheckBoxItem(checkBoxItem.filter(item => item !== title));
      } else {
        setCheckBoxItem([...checkBoxItem, title]);
      }
    } else {
      setCheckBoxItem(title === checkBoxItem ? "" : title);
    }
  };

  return (
    <div 
      className="flex gap-2 items-center cursor-pointer group" 
      onClick={() => handleCheckBoxChange()}
    >
      <div 
        className="
          w-[20px] h-[20px] 
          rounded-[3px] 
          grid place-content-center 
          text-[12px]
          border 
          border-[#8B0000]/30 
          group-hover:border-[#8B0000]/50
          transition-all 
          duration-300
          bg-[#1a0000]
          group-hover:bg-[#1a0000]/80
        "
      >
        {multipleSelect
          ? checkBoxItem.includes(title) && (
            <motion.div 
              initial={{ fontSize: '14px', opacity: 0 }} 
              animate={{ fontSize: '12px', opacity: 1 }}
              className="text-[#8B0000] group-hover:text-[#FF4500]"
            >
              <FaCheck />
            </motion.div>
          )
          : checkBoxItem === title && (
            <motion.div 
              initial={{ fontSize: '14px', opacity: 0 }} 
              animate={{ fontSize: '12px', opacity: 1 }}
              className="text-[#8B0000] group-hover:text-[#FF4500]"
            >
              <FaCheck />
            </motion.div>
          )
        }
      </div>
      <div 
        className="
          text-[#ebebebdc] 
          font-['poppins'] 
          text-[16px]
          group-hover:text-[#FF4500]
          transition-all 
          duration-300
        "
      >
        {title}
      </div>
    </div>
  )
}

export default Checkbox