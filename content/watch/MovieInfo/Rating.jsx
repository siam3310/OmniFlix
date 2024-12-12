"use client"
import { IoStar, IoHeartHalf } from "react-icons/io5";
import { FaHeart, FaShareAlt, FaBookmark } from "react-icons/fa";
import { motion } from "framer-motion";

const Rating = ({ info }) => {
  // Calculate star fill percentage
  const starPercentage = (info?.vote_average / 10) * 100;

  // Determine rating category
  const getRatingCategory = (rating) => {
    if (rating >= 9) return "Masterpiece";
    if (rating >= 7) return "Excellent";
    if (rating >= 5) return "Good";
    if (rating >= 3) return "Average";
    return "Needs Improvement";
  };

  const ratingCategory = getRatingCategory(info?.vote_average);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[350px] bg-[#1a1a1a] border-2 border-[#8B0000]/30 rounded-2xl p-6 shadow-lg shadow-[#8B0000]/20"
    >
      {/* Rating Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-2xl font-bold tracking-wider">
          Community Rating
        </h2>
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[#8B0000] hover:text-[#FF4500] transition-colors"
          >
            <FaShareAlt />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-[#8B0000] hover:text-[#FF4500] transition-colors"
          >
            <FaBookmark />
          </motion.button>
        </div>
      </div>

      {/* Rating Score */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="flex text-4xl text-[#3a3a3a]">
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </div>
          <div 
            className="absolute top-0 flex text-4xl text-[#8B0000] overflow-hidden"
            style={{ width: `${starPercentage}%` }}
          >
            <IoStar />
            <IoStar />
            <IoStar />
            <IoStar />
          </div>
        </div>
        
        <div>
          <p className="text-3xl font-bold text-[#8B0000]">
            {info?.vote_average.toFixed(1)}<span className="text-xl">/10</span>
          </p>
          <p className="text-white/70 text-sm">
            {ratingCategory}
          </p>
        </div>
      </div>

      {/* Rating Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#0d0d0d] rounded-lg p-3 text-center">
          <p className="text-[#8B0000] text-2xl font-bold">
            {info?.popularity.toLocaleString()}
          </p>
          <p className="text-white/70 text-sm">Total Ratings</p>
        </div>
        <div className="bg-[#0d0d0d] rounded-lg p-3 text-center">
          <p className="text-[#8B0000] text-2xl font-bold">
            {info?.vote_count.toLocaleString()}
          </p>
          <p className="text-white/70 text-sm">Reviews</p>
        </div>
      </div>

      {/* Rate Action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-[#8B0000] text-white py-3 rounded-lg 
        flex items-center justify-center space-x-2 
        hover:bg-[#FF4500] transition-colors 
        group"
      >
        <IoHeartHalf className="text-xl group-hover:text-white/80 transition-colors" />
        <span>Rate This {info?.type === 'movie' ? 'Movie' : 'Series'}</span>
      </motion.button>

      {/* Blade-like Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] 
        bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
        opacity-50"
      />
    </motion.div>
  );
}

export default Rating;