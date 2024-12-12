"use client"
import Image from "next/image"
import styles from "./TrendingCard.module.css"
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Totalgenres } from "@/utils/Genres";
import { motion } from "framer-motion";

const TrendingCard = ({ info }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="transform transition-transform duration-300"
    >
      <Link
        href={`/watch/${info?.id}?media_type=${info?.media_type || "movie"}`}
        className={`${styles.cardImage} w-full aspect-[9/14] rounded-2xl relative overflow-hidden cursor-pointer group`}
      >
        {/* Image with blur effect */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${info?.poster_path}`}
          alt="Trending"
          width={200}
          height={280}
          quality={100}
          className="object-cover w-full h-full rounded-2xl hover:cursor-pointer transition-transform duration-300 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div 
          className={`${styles.rating} absolute top-0 left-0 bg-[#1a0000] w-[60%] rounded-br-lg rounded-tl-md flex items-center justify-center gap-2 text-white h-10`}
        >
          <FaStar className="text-[#8B0000]" />
          <span className="text-[#ffffff]">{info?.vote_average?.toFixed(1)}</span>
        </div>

        {/* Gradient Overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a0000]/80 to-transparent z-10"
        ></div>

        {/* Content Overlay */}
        <div 
          className="absolute bottom-0 left-0 pl-[8px] pb-2 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
        >
          <h1 
            className="text-[#ffffff] font-medium text-md font-['poppins'] w-[186px] line-clamp-1 text-ellipsis overflow-hidden cursor-pointer"
          >
            {info?.title || info?.name || ""}
          </h1>
          <span 
            className="text-[#8B0000] text-sm flex items-center gap-1"
          >
            <span className="bg-[#8B0000]/20 px-1 rounded">
              {info?.media_type?.length > 2 
                ? info?.media_type?.charAt(0).toUpperCase() + info?.media_type?.slice(1).toLowerCase() 
                : info?.media_type?.toUpperCase()}
            </span>
            <span className="mx-1">•</span>
            {Totalgenres.find(g => g.id === info?.genre_ids[0])?.name}
          </span>
        </div>

        {/* Hover Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-3 bg-[#1a0000]/80 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold text-sm line-clamp-1">
                {info?.title || info?.name}
              </h2>
              <div className="text-[#8B0000] text-xs flex items-center gap-2">
                <span>{info?.media_type?.toUpperCase()}</span>
                <span className="h-1 w-1 bg-[#8B0000] rounded-full"></span>
                <span>
                  {Totalgenres.find(g => g.id === info?.genre_ids[0])?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white">
              <FaStar className="text-[#8B0000]" />
              <span>{info?.vote_average?.toFixed(1)}</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default TrendingCard