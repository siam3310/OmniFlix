"use client"

import TrendingCard from "@/components/Cards/TrendingCard/TrendingCard"
import { Fragment, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaFire, FaBladeIcons } from "react-icons/fa6"

const Trending = ({ data }) => {
  const { results = [] } = data || {};
  const [activeCategory, setActiveCategory] = useState('all');

  // Blade-like category filtering
  const categories = [
    { key: 'all', label: 'All Trends' },
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ];

  const filteredResults = activeCategory === 'all' 
    ? results.slice(0, 16)
    : results.filter(item => item.media_type === activeCategory).slice(0, 16);

  return (
    <div className="w-full max-w-[100rem] my-12 relative group">
      {/* Bleeding Edge Background Effect */}
      <div 
        className="absolute -inset-2 bg-gradient-to-br from-[#1a0000]/30 via-[#420000]/20 to-[#0d0d0d]/10 
        rounded-[2.5rem] 
        opacity-0 
        group-hover:opacity-50 
        transition-all 
        duration-500 
        blur-2xl 
        my-12
        pointer-events-none"
      />

      {/* Ultra-Premium Container */}
      <div className="relative z-10  my-12 rounded-3xl border-2 border-[#8B0000]/20 overflow-hidden shadow-2xl shadow-[#8B0000]/30">
        {/* Cinematic Header with Blade Accent */}
        <div className="relative py-6 px-8 ">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] flex items-center gap-4"
            >
              <FaFire className="text-[#8B0000] animate-pulse" />
              | Trending Now
            </motion.h1>

            {/* Blade-like Category Selector */}
            <div className="flex space-x-2 bg-[#0d0d0d] rounded-full p-1 border border-[#8B0000]/30">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`
                    px-4 py-2 
                    rounded-full 
                    text-sm 
                    font-medium 
                    transition-all 
                    duration-300 
                    ${activeCategory === category.key 
                      ? 'bg-[#8B0000] text-white shadow-lg shadow-[#8B0000]/50' 
                      : 'text-[#8B0000]/70 hover:bg-[#8B0000]/10'}
                  `}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Blade Accent Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50"
          />
        </div>

        {/* Grid with Advanced Animations */}
        <AnimatePresence>
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-auto-fit gap-4 p-6 "
          >
            {filteredResults.map((item, index) => (
              <motion.div
                key={item.id}
                
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300
                }}
                className="relative group"
              >
                <TrendingCard info={item} />
                
                {/* Ranking Badge with Blade Effect */}
                <div className="absolute top-2 right-2 
                  bg-[#8B0000] 
                  text-white 
                  px-3 py-1 
                  rounded-full 
                  text-xs 
                  font-bold 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity 
                  duration-300 
                  shadow-md 
                  shadow-[#420000]/50
                  border-2 
                  border-[#420000]/30
                ">
                  #{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bleeding Edge Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#420000] to-transparent opacity-50"></div>
      </div>

      
    </div>
  )
}

export default Trending