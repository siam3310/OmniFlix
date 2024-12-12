"use client"
import Card from "@/components/Cards/Card/Card"
import { getPopularMovies } from "@/lib/MoviesFunctions"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FaFireAlt } from "react-icons/fa"

const Popular = () => {
  const [page, setPage] = useState(1)
  const [popularData, setPopularData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPopular = async () => {
      setLoading(true)
      const data = await getPopularMovies(page)
      setPopularData([...popularData, ...data?.results])
      setLoading(false)
    }
    getPopular()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-16 max-[1270px]:-mt-2 bg-[#0d0d0d] rounded-2xl border border-[#8B0000]/20 shadow-2xl shadow-[#8B0000]/30 overflow-hidden">
      {/* Blade-like Gradient Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1a0000] via-[#420000] to-[#1a0000] border-b border-[#8B0000]/30">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B0000] to-[#FF4500] font-medium text-2xl font-['poppins'] flex items-center gap-3">
          <FaFireAlt className="text-[#8B0000] animate-pulse" />
          Most Popular
        </h1>
        
        {/* Subtle Accent Line */}
        <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50"></div>
      </div>

      {/* Grid with Advanced Hover Effects */}
      <div className="mt-8 grid grid-auto-fit gap-3 p-6 bg-[#0d0d0d]">
        {popularData?.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(139,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <Card data={item} />
          </motion.div>
        ))}
        
        {loading ? 
          Array(20)
            .fill(0)
            .map((_, index) => <Card key={index} loading />) 
          : null
        }
      </div>

      {/* Load More Button with Blade-like Design */}
      <div className="mt-8 w-full flex justify-center pb-8">
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(139,0,0,0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage(page + 1)}
          className="
            bg-[#1a0000] 
            border-2 
            border-[#8B0000]/30 
            hover:bg-[#420000]/20 
            hover:border-[#8B0000]/50 
            cursor-pointer 
            w-full 
            max-w-96 
            text-center 
            py-3 
            rounded-xl 
            text-white 
            font-['poppins'] 
            transition-all 
            duration-300 
            ease-in-out 
            shadow-lg 
            shadow-[#8B0000]/20 
            hover:shadow-xl 
            hover:shadow-[#8B0000]/30 
            flex 
            items-center 
            justify-center 
            gap-3
            relative 
            overflow-hidden
            group
          "
        >
          {/* Blade Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
          
          Load More
          <FaFireAlt className="text-[#8B0000] group-hover:animate-pulse" />
        </motion.button>
      </div>

      {/* Subtle Background Texture */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 
        bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
        [background-size:16px_16px]"
      />
    </div>
  )
}

export default Popular