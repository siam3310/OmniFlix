import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import './watch.css'
import MovieInfos from "@/content/watch/MovieInfo/MovieInfo"
import Rating from "@/content/watch/MovieInfo/Rating"
import { WatchAreaContextProvider } from "@/context/Watch"
import { WatchSettingContextProvider } from "@/context/WatchSetting"
import { Fragment } from "react"
import Comments from "@/content/watch/Comment/Comment"
import Recommendation from "@/content/watch/Recommendation/Recommendation"
import { getInfoTMDB } from "@/lib/MoviesFunctions"
import MovieNotFound from "@/components/errors/MovieNotFound"

const Watch = async ({ params, searchParams }) => {
  const { id: MovieId } = params
  const { media_type } = searchParams

  const MovieInfo = await getInfoTMDB(MovieId, media_type)

  if (MovieInfo === "media_type_error") {
    return <MovieNotFound />
  }

  if (!MovieInfo) {
    return (
      <div className="bg-[#0d0d0d] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-[#8B0000]">Error loading media</h1>
          <p className="text-[#ffffff8a]">There was a problem fetching the media information. Please try again later.</p>
        </div>
      </div>
    );
  }

  return MovieInfo ?
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
        <div className="w-full max-w-[96rem]">
          <WatchSettingContextProvider>
            <WatchAreaContextProvider MovieInfo={MovieInfo} MovieId={MovieId} >
              <EpisodeSelector />
              <MainVideo />
            </WatchAreaContextProvider>
          </WatchSettingContextProvider>

          <div className="mt-20 flex gap-44">
            <MovieInfos info={MovieInfo} />
            <Rating info={MovieInfo} />
          </div>

          <div className="flex mb-5 gap-5 max-[1125px]:flex-col mt-24">
            <Comments MovieId={MovieId} title={MovieInfo?.title} />
            <Recommendation MovieId={MovieId} type={MovieInfo?.type} />
          </div>
        </div>
      </div>

      {/* background */}
      <div 
        className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] 
        bg-[#8B0000]/20 blur-[200px] 
        animate-pulse duration-[4s] ease-in-out"
      ></div>
      <div 
        className="absolute max-[737px]:fixed w-[500px] h-[370.13px] 
        right-[50%] bottom-[-25%] 
        bg-[#420000]/30 blur-[215.03px] 
        translate-x-[70%] z-0 rounded-b-[30%] 
        animate-pulse duration-[6s] ease-in-out"
      ></div>
      
      {/* Subtle background pattern */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 
        bg-[radial-gradient(#8B0000_1px,transparent_1px)] 
        [background-size:16px_16px]
        before:content-[''] before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-[#0d0d0d] before:via-[#1a0000]/20 before:to-[#0d0d0d] 
        before:opacity-50"
      />
    </Fragment>

    : <MovieNotFound />
}

export default Watch