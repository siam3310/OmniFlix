"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import EpisodeCard from "./EpisodeCard";
import { useWatchContext } from "@/context/Watch";
import { 
  FaLayerGroup, 
  FaTv 
} from "react-icons/fa6";
const EpisodeSelector = () => {
  const [epFromTo, setEpFromTo] = useState(0);
  const [TFseason, setTFseason] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedEP, setWatchedEP] = useState([]);

  const chunkSize = 15;

  const {
    episode,
    episodes,
    MovieId,
    MovieInfo,
    setSeason,
    episodeLoading,
  } = useWatchContext();

  let loading = episodeLoading;

  useEffect(() => {
    setSeason(TFseason + 1);
  }, [TFseason]);

  const SplitedEpisodes = useMemo(() => {
    return episodes?.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) {
        chunks.push(episodes.slice(i, i + chunkSize));
      }
      return chunks;
    }, []);
  }, [episodes]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(`playing.${MovieId}`) || "[]");
    if (!storedItems.includes(episode)) {
      storedItems.push(episode);
      localStorage.setItem(`playing.${MovieId}`, JSON.stringify(storedItems));
    }
    setWatchedEP(storedItems);
  }, [MovieId, episode]);

  const handleSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Generate episode range options
  const episodeRangeOptions = useMemo(() => 
    Array.from({ length: SplitedEpisodes?.length ?? 0 }, (v, i) => 
      `${i === 0 && i * chunkSize === 0 ? 1 : i * chunkSize} - ${(i + 1) * chunkSize}`
    ), [SplitedEpisodes]);

  // Generate season options
  const seasonOptions = useMemo(() => 
    MovieInfo?.type === "tv" 
      ? [...Array(MovieInfo?.seasons?.length).keys()].map(i => `Season ${i + 1}`)
      : [], 
    [MovieInfo]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a1a1a] w-full max-w-[22rem] EPSResponsive rounded-xl flex flex-col border-2 border-[#8B0000]/30 shadow-lg shadow-[#8B0000]/20"
    >
      {/* Header Section with Search */}
      <div className="bg-[#0d0d0d] rounded-t-xl">
        <div className="flex justify-between px-2 py-3 border-b-2 border-[#8B0000]/20">
          {/* Search Input */}
          <div className="bg-[#1a1a1a] h-10 rounded-md flex-grow mr-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Episode"
                className="bg-transparent outline-none h-full w-full px-2 text-slate-200 pl-8"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[#8B0000]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Filters */}
<div className="px-4 py-4 bg-[#0d0d0d] border-b border-[#8B0000]/20">
  <div className="flex items-center space-x-4">
    {/* Episode Range Selector */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative w-full group"
    >
      <div className="flex items-center space-x-2 mb-2">
        <FaLayerGroup className="text-[#8B0000]" />
        <span className="text-white/70 text-sm">Episode Range</span>
      </div>
      
      <div className="flex space-x-2">
        {episodeRangeOptions.map((range, index) => (
          <motion.button
            key={range}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setEpFromTo(index)}
            className={`
              px-4 py-2 
              rounded-lg 
              text-sm 
              transition-all 
              duration-300 
              ${epFromTo === index 
                ? 'bg-[#8B0000] text-white shadow-lg shadow-[#8B0000]/30' 
                : 'bg-[#1a1a1a] text-white/70 border border-[#8B0000]/20 hover:bg-[#8B0000]/10'
              }
            `}
          >
            {range}
          </motion.button>
        ))}
      </div>
    </motion.div>
     </div>
    {/* Season Selector for TV Shows */}
    {MovieInfo?.type === "tv" && (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative w-full group"
      >
        <div className="flex items-center space-x-2 mb-2">
          <FaTv className="text-[#8B0000]" />
          <span className="text-white/70 text-sm">Season Selection</span>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {seasonOptions.map((season, index) => (
            <motion.button
              key={season}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTFseason(index)}
              className={`
                px-4 py-2 
                rounded-lg 
                text-sm 
                whitespace-nowrap
                transition-all 
                duration-300 
                ${TFseason === index 
                  ? 'bg-[#8B0000] text-white shadow-lg shadow-[#8B0000]/30' 
                  : 'bg-[#1a1a1a] text-white/70 border border-[#8B0000]/20 hover:bg-[#8B0000]/10'
                }
              `}
            >
              {season}
            </motion.button>
          ))}
        </div>
      </motion.div>
    )}
  </div>
  {/* Blade-like Accent */}
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ duration: 0.5 }}
    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B0000]/50 to-transparent opacity-50"
  />
</div>

      {/* Episodes List */}
      <div className="px-2 overflow-y-scroll h-full max-h-[44rem] scrollbar-thin scrollbar-thumb-[#8B0000]/30 scrollbar-track-[#1a1a1a]">
        {!loading ? (
          !searchQuery ? (
            SplitedEpisodes[epFromTo]?.map((item, index) => (
              <motion.div
                key={index + 1}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <EpisodeCard 
                  info={item} 
                  currentEp={episode} 
                  watchedEP={watchedEP} 
                  posterImg={MovieInfo?.poster_path} 
                />
              </motion.div>
            ))
          ) : (
            episodes
              .filter(
                (item) =>
                  `episode ${item?.episode_number.toString()}`.includes(searchQuery.toLowerCase()) ||
                  item?.name?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '')?.includes(searchQuery.toLowerCase())
              )
              ?.map((item, index) => (
                <motion.div
                  key={index + 1}
                  initial={{ opacity: 0, y:  20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EpisodeCard 
                    info={item} 
                    currentEp={episode} 
                    watchedEP={watchedEP} 
                    posterImg={MovieInfo?.poster_path} 
                  />
                </motion.div>
              ))
          )
        ) : (
          <div className="text-center text-white">Loading...</div>
        )}
      </div>
    </motion.div>
  );
};

export default EpisodeSelector;