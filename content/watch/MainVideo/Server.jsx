import { useWatchContext } from "@/context/Watch"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { FaServer } from "react-icons/fa6"

const Server = () => {
  const { 
    MovieId, 
    setWatchInfo, 
    watchInfo, 
    MovieInfo, 
    episode, 
    season 
  } = useWatchContext()

  const defaultVideoServers = [
    "Vidsrc.net",
    "Vidlink"
  ]

  const MovieVideoPlayers = {
    "vidsrc.dev": `https://vidsrc.dev/embed/movie/${MovieId}`,
    "vidsrc.cc": `https://vidsrc.cc/v2/embed/movie/${MovieId}`,
    vidsrc: `https://vidsrc.in/embed/movie/${MovieId}`,
    vidsrcpro: `https://vidsrc.pro/embed/movie/${MovieId}`,
    RiveStream: `https://rivestream.live/watch?type=movie&amp&id=${MovieId}`,
    "embedSU": `https://embed.su/embed/movie/${MovieId}`,
    "VidLink": `https://vidlink.pro/movie/${MovieId}?primaryColor=b8962e&secondaryColor=d4af376&iconColor=b8962e&title=true&poster=true&autoplay=true&nextbutton=true`,
  }

  const TVVideoPlayers = {
    "vidsrc.dev": `https://vidsrc.dev/embed/tv/${MovieId}/${season}/${episode}`,
    "vidsrc.cc": `https://vidsrc.cc/v2/embed/tv/${MovieId}/${season}/${episode}`,
    vidsrc: `https://vidsrc.in/embed/tv/${MovieId}/${season}/${episode}`,
    vidsrcpro: `https://vidsrc.pro/embed/tv/${MovieId}/${season}/${episode}`,
    "RiveStream": `https://rivestream.live/watch?type=tv&amp&id=${MovieId}&season=${season}&episode=${episode}`,
    "embedSU": `https://embed.su/embed/tv/${MovieId}/${season}/${episode}`,
    "VidLink": `https://vidlink.pro/tv/${MovieId}/${season}/${episode}?primaryColor=b8962e&secondaryColor=d4af376&iconColor=b8962e&title=true&poster=true&autoplay=true&nextbutton=true`,

  }

  const MovievideoPlayerEntry = Object.entries(MovieVideoPlayers)
  const TVVideoPlayerEntry = Object.entries(TVVideoPlayers)

  const setdefault = () => {
    if (MovieInfo?.type === "movie") {
      if (!watchInfo?.url) {
        setWatchInfo({
          url: MovievideoPlayerEntry[0][1],
          iframe: true,
          loading: false
        })
      }
    }
    else {
      setWatchInfo({
        url: TVVideoPlayerEntry[0][1],
        iframe: true,
        loading: false
      })
    }
  }

  useEffect(() => {
    setdefault()
  }, [episode, season])

  const changeServer = async (item, isIframe = true) => {
    try {
      // Determine which set of video players to use based on media type
      const videoPlayers = MovieInfo?.type === "movie" 
        ? MovieVideoPlayers 
        : TVVideoPlayers

      // If it's an iframe server (from video player entries)
      if (isIframe) {
        const serverUrl = item[1]
        setWatchInfo({
          url: serverUrl,
          iframe: true,
          loading: false
        })
      } 
      // If it's a default video server
      else {
        // This is a placeholder. You might want to implement actual logic 
        // for non-iframe servers like Vidsrc.net or Vidlink
        console.log("Switching to non-iframe server:", item)
        setWatchInfo({
          item: item,
          iframe: false,
          loading: true
        })
      }
    } catch (error) {
      console.error("Error changing server:", error)
      // Optionally set an error state or show a notification
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Server Selection Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0d0d0d] w-full h-full px-4 flex items-center gap-4 border-b border-[#8B0000]/20"
      >
        <div className="flex items-center text-[#8B0000] gap-2">
          <FaServer className="text-xl" />
          <span className="text-white">Server</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
          {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map(item => (
            <motion.div
              key={item[0]}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeServer(item)}
              className={`
                px-4 py-2 
                text-[15px] 
                rounded-md 
                cursor-pointer 
                transition-all 
                duration-300 
                ${watchInfo?.url === item[1] 
                  ? 'bg-[#8B0000]/30 text-white' 
                  : 'bg-[#1a1a1a] text-[#8B0000] hover:bg-[#8B0000]/20'
                }
              `}
            >
              {item[0]}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Player Selection Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#0d0d0d] w-full h-full px-4 flex items-center gap-4"
      >
        <div className="flex items-center text-[#8B0000] gap-2">
          <FaServer className="text-xl" />
          <span className="text-white">Player</span>
        </div>
        
        <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
          {defaultVideoServers?.map(item => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => changeServer(item, false)}
              className={`
                px-4 py-2 
                text-[15px] 
                rounded-md 
                cursor-pointer 
                transition-all 
                duration-300
                
                ${watchInfo?.item === item 
                  ? 'bg-[#8B0000]/30 text-white' 
                  : 'bg-[#1a1a1a] text-[#8B0000] hover:bg-[#8B0000]/20'
                }
              `}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Blade-like Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[2px] 
      bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
      opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] 
      bg-gradient-to-r from-transparent via-[#8B0000] to-transparent 
      opacity-50"></div>
    </div>
  )
}

export default Server