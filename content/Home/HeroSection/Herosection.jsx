"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaCirclePlay, FaPlay, FaInfoCircle } from "react-icons/fa";
import { IoStar, IoBookmark, IoShareSocial,IoClose } from "react-icons/io5";



const Herosection = ({ data }) => {
  const { results = [] } = data || {};
  const [populardata, setPopularData] = useState(null);
  const backgroundRef = useRef(null);

  // Parallax Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (backgroundRef.current) {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        backgroundRef.current.style.transform = `translate(${-x}px, ${-y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random Selection with Smart Logic
  useEffect(() => {
    if (results && Array.isArray(results) && results.length > 0) {
      // Prioritize highly-rated, recent movies
      const filteredResults = results.filter(
        movie => movie.vote_average > 7 && 
        new Date(movie.release_date).getFullYear() >= new Date().getFullYear() - 2
      );

      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      setPopularData(filteredResults[randomIndex] || results[0]);
    }
  }, [results]);

  // Genre Mapping
  const getGenreNames = (genreIds) => {
    const genreMap = {
      28: "Action", 35: "Comedy", 18: "Drama", 
      27: "Horror", 10749: "Romance", 878: "Sci-Fi"
    };
    return genreIds
      .slice(0, 3)
      .map(id => genreMap[id])
      .filter(Boolean)
      .join(" • ");
  };

  if (!populardata) return null;

  return (
    <div className="relative w-full overflow-hidden min-h-[90vh] flex items-center">
      {/* Advanced Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${populardata?.backdrop_path}`}
          alt="banner"
          fill
          priority
          className="object-cover w-full h-full opacity-30 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/70 to-[#0d0d0d]/40" />
      </div>

      {/* Hero Content */}
      <motion.div 
        className="relative z-10 max-w-[96rem] mx-auto px-8 grid grid-cols-12 gap-8 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Poster Column */}
        <motion.div 
          className="col-span-4 hidden md:block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500${populardata?.poster_path}`}
              alt={populardata?.title || populardata?.name}
              width={400}
              height={600}
              className="rounded-xl shadow-2xl shadow-[#8B0000]/30 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <IoStar className="text-yellow-500" />
                <span>{populardata?.vote_average?.toFixed(1)}/10</span>
              </div>
              <div className="flex space-x-3">
                <IoBookmark className="text-white hover:text-[#8B0000] cursor-pointer" />
                <IoShareSocial className="text-white hover:text-[#8B0000] cursor-pointer" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Column */}
        <div className="col-span-12 md:col-span-8 text-white">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[#ed2672] font-medium">
                #{results?.indexOf(populardata) + 1} Trending
              </span>
              <span className="text-[#2fc867] uppercase">
                {getGenreNames(populardata?.genre_ids)}
              </span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 text-white tracking-tight">
              {populardata?.title || populardata?.name}
            </h1>
          </motion.div>

          {/* Movie Details */}
          <motion.div 
            className="flex items-center space-x-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>
              {new Date(populardata?.release_date).getFullYear()}
            </span>
            <span className="text-[#2fc867] uppercase">
              {populardata?.original_language === "en" ? "English" : populardata?.original_language}
            </span>
          </motion.div>

          {/* Overview */}
          <motion.p 
            className="text-gray-300 mb-8 line-clamp-3 max-w-[700px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {populardata?.overview}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href={`/watch/${populardata?.id}?media_type=${populardata?.media_type}`} 
              className="flex items-center bg-[#8B0000] hover:bg-[#6B0000] text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-[#8B0000]/50"
            >
              <FaPlay className="mr-2" /> Watch Now
            </Link>
            
            
          </motion.div>
        </div>
      </motion.div>

      
    </div>
  );
};

export default Herosection;