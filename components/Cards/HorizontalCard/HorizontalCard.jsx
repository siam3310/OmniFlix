"use client"
import { Totalgenres } from "@/utils/Genres";
import Image from "next/image"
import Link from "next/link";
import { IoLayers } from "react-icons/io5";
import { motion } from "framer-motion";

const HorizontalCard = ({ data, type }) => {
  const languageMap = {
    en: "English",
    ja: "Japanese",
    id: "Indonesia",
    fr: "France"
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: "rgba(139, 0, 0, 0.1)" 
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-[#1a0000] border-[1px] border-[#8B0000]/30 flex w-full h-full overflow-hidden rounded-md relative items-center shadow-md shadow-[#8B0000]/10 transition-all duration-300"
    >
      <Link href={`/watch/${data?.id}?media_type=${type}`} className="flex items-center">
        <Image
          src={`https://image.tmdb.org/t/p/w94_and_h141_face${data?.backdrop_path}`}
          alt="Recommendation"
          height={130}
          width={100}
          className={"object-cover h-[106px] w-[80px] cursor-pointer max-[420px]:w-[112px] rounded-l-md"}
        />
      </Link>

      <div className="w-full h-full flex flex-col mx-2 my-2 max-w-[17rem] justify-center">
        <div className="flex flex-col gap-3">
          <Link 
            href={`/watch/${data?.id}?media_type=${type}`} 
            className="text-[#c4c7cc] text-[15px] font-medium overflow-hidden text-ellipsis line-clamp-2 hover:text-[#FF4500] transition-all cursor-pointer"
          >
            {data?.title || data?.name || "A God like movie"}
          </Link>

          <div className="flex gap-[6px] text-[14px] text-[#c4c7ccce] items-center">
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1">
              <span className="bg-[#8B0000]/20 px-1 rounded text-[#8B0000]">
                {data?.media_type.length > 2 
                  ? data?.media_type?.charAt(0)?.toUpperCase() + data?.media_type?.slice(1).toLowerCase() 
                  : data?.media_type?.toUpperCase()}
              </span>
            </div>
            <div className="h-1 w-1 bg-[#8B0000] rounded-full"></div>
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1">
              <IoLayers className="text-[#8B0000]" /> 
              {Totalgenres.find(g => g.id === data?.genre_ids[0])?.name}
            </div>
            <div className="h-1 w-1 bg-[#8B0000] rounded-full"></div>
            <div className="flex items-center gap-1 font-medium overflow-hidden text-ellipsis line-clamp-1 text-[#c4c7ccce]">
              {languageMap[data?.original_language] || data?.original_language}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Blade-like Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] 
        bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
        opacity-50"
      ></div>
    </motion.div>
  )
}

export default HorizontalCard