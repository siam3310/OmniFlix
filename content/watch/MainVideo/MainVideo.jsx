"use client"

import { motion } from "framer-motion";
import { useWatchContext } from "@/context/Watch";
import EpInfo from "./EpInfo";
import Option from "./Option"
import Server from "./Server";
import VideoPlayer from "./videoPlayer/VideoPlayer";

const MainVideo = () => {
  const { episode } = useWatchContext();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#0d0d0d] rounded-xl p-2 !pb-0 flex flex-col 
      shadow-[0_10px_30px_rgba(139,0,0,0.2)] 
      border border-[#8B0000]/20 
      relative 
      overflow-hidden"
    >
      {/* Blade-like Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] 
      bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
      opacity-50"></div>

      {/* Video Player */}
      <VideoPlayer />

      

      {/* Episode Info and Server Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="h-full min-h-[124px] 
        bg-[#0d0d0d] 
        text-slate-100 
        flex 
        rounded-xl 
        overflow-hidden 
        mt-4 
        shadow-[0_5px_25px_rgba(139,0,0,0.1)] 
        max-[880px]:flex-col 
        border 
        border-[#8B0000]/20"
      >
        <EpInfo episode={episode} />
        <Server />
      </motion.div>

      {/* Subtle Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 
      bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
      [background-size:16px_16px]"></div>

      {/* Bleeding Edge Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] 
      bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
      opacity-50"></div>
    </motion.div>
  )
}

export default MainVideo