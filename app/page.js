import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection"
import Popular from "@/content/Home/Popular";
import TopRated from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import WatchHistory from "@/content/Home/WatchHistory";
import { getTrendingMovies, getTopRatedMovies } from "@/lib/MoviesFunctions";

const Home = async () => {
  const [trendingdata, top_rateddata] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies()
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d] text-white">
      {/* Blood Drip Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className="absolute w-[2px] bg-gradient-to-b from-[#8B0000] to-transparent opacity-30 animate-blood-drip"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Pulsating Background Overlay */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-[#1a0000] via-[#0d0d0d] to-[#1a0000] 
        opacity-50 animate-pulse pointer-events-none z-0"
      />

      {/* Subtle Background Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0 
        bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
        [background-size:16px_16px]"
      />

      {/* Main Content Container */}
      <div className="relative z-4 w-full flex flex-col items-center main-responsive">
        {/* Herosection with Enhanced Styling */}
        <div className="relative w-full">
          <Herosection data={trendingdata} />
          <div className="absolute inset-0 bg-gradient-to-b 
  from-transparent 
  via-[#8B0000]/40 
  via-[#420000]/60 
  to-[#0d0d0d] 
  pointer-events-none"
/>   
</div>

        {/* Content Sections */}
        <div className="max-w-[96rem] w-full z-10 space-y-16 py-16">
          
          <div className="my-12">
            <Trending 
            data={trendingdata} 
            className="bg-[#8B0000]/10 backdrop-blur-sm rounded-2xl p-6 
            border border-[#8B0000]/20 
            transition-all duration-300 
            hover:border-[#8B0000]/50 
            hover:shadow-lg 
            my-12
            hover:shadow-[#8B0000]/30"
          /> </div>
          
          <WatchHistory 
            className="bg-[#8B0000]/10 backdrop-blur-sm rounded-2xl p-6 
            border border-[#8B0000]/20 
            transition-all duration-300 
            hover:border-[#8B0000]/50 
            hover:shadow-lg 
            hover:shadow-[#8B0000]/30"
          />
          
          <Popular 
            className="bg-[#8B0000]/10 backdrop-blur-sm rounded-2xl p-6 
            border border-[#8B0000]/20 
            transition-all duration-300 
            hover:border-[#8B0000]/50 
            hover:shadow-lg 
            hover:shadow-[#8B0000]/30"
          />
          
          <TopRated 
            data={top_rateddata} 
            className="bg-[#8B0000]/10 backdrop-blur-sm rounded-2xl p-6 
            border border-[#8B0000]/20 
            transition-all duration-300 
            hover:border-[#8B0000]/50 
            hover:shadow-lg 
            hover:shadow-[#8B0000]/30"
          />
        </div>
      </div>

      {/* Accent Lines */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#8B0000] to-transparent opacity-50"></div>
      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#420000] to-transparent opacity-50"></div>

    </div>
  )
}

export default Home